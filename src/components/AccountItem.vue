<script setup lang="ts">
import { QuestionFilled, Delete } from '@element-plus/icons-vue';
import type { IAccount } from "../types/";

const props = defineProps<{
  account: IAccount;
}>();

const emit = defineEmits(["update:account", "delete:account"]);

const { errors } = useValidation();
const localAccount = ref<IAccount>({ ...props.account });
const dialogVisible = ref(false);
const displayedLabel = ref("");
const labelTags = ref<{text: string}[]>([]);

const formatLabelForDisplay = (label: IAccount['label']): string => {
  if (Array.isArray(label)) {
    return label.map(item => item.text).join('; ');
  } else if (typeof label === 'string') {
    try {
      const parsed = JSON.parse(label);
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => item.text).join('; ');
      }
    } catch {
    console.warn("Invalid JSON format for labels: ", errors);
    }
    return label;
  }
  return "";
};


const parseLabels = (labelStr: string): {text: string}[] => {
  return labelStr
    .split(';')
    .map(label => ({ text: label.trim() }))
    .filter(label => label.text);
};


onMounted(() => {
  displayedLabel.value = formatLabelForDisplay(localAccount.value.label);
  labelTags.value = parseLabels(displayedLabel.value);
});


watch(displayedLabel, (newValue) => {
  labelTags.value = parseLabels(newValue);
});

const loginError = computed(() =>
  localAccount.value.login ? "" : "Логин обязателен"
);

const passwordError = computed(() =>
  localAccount.value.type === "Локальная" && !localAccount.value.password
    ? "Пароль обязателен"
    : ""
);

const validateAndSave = () => {

  if (!loginError.value && (localAccount.value.type !== "Локальная" || !passwordError.value)) {

    const labels = parseLabels(displayedLabel.value);

    const updatedAccount = {
      ...localAccount.value,
      label: labels,
      password: localAccount.value.type === "LDAP" ? null : localAccount.value.password
    };

    emit("update:account", updatedAccount);
  }
};

const deleteAccount = () => {
  emit("delete:account", localAccount.value.id);
};

const handleTypeChange = () => {
  if (localAccount.value.type === "LDAP") {
    localAccount.value.password = null;
  } else if (!localAccount.value.password) {
    localAccount.value.password = "";
  }
  validateAndSave();
};
</script>

<template>
  <ElCard class="account-item" shadow="hover">
    <div class="form-grid">
      <div class="form-item">
        <label>Метка</label>
        <div class="input-with-tooltip">
          <ElInput
            v-model="displayedLabel"
            placeholder="Метка (необязательно, максимум 50 символов)"
            :maxlength="50"
            @blur="validateAndSave"
          >
            <template #suffix>
              <ElTooltip
                effect="dark"
                content="Метки помогают организовать и быстро находить ваши учетные записи. Разделяйте метки точкой с запятой (;)"
                placement="top"
              >
                <el-icon class="tooltip-icon"><QuestionFilled /></el-icon>
              </ElTooltip>
            </template>
          </ElInput>
        </div>
        <div v-if="labelTags.length > 0" class="tags-container">
          <ElTag
            v-for="(tag, index) in labelTags"
            :key="index"
            size="small"
            type="info"
            effect="plain"
          >
            {{ tag.text }}
          </ElTag>
        </div>
      </div>

      <div class="form-item">
        <label>Тип записи</label>
        <ElSelect
          v-model="localAccount.type"
          class="w-100"
          placeholder="Выберите тип"
          @change="handleTypeChange"
        >
          <ElOption label="LDAP" value="LDAP" />
          <ElOption label="Локальная" value="Локальная" />
        </ElSelect>
      </div>

      <div class="form-item">
        <label>Логин</label>
        <ElInput
          v-model="localAccount.login"
          placeholder="Логин (обязательно, максимум 100 символов)"
          :maxlength="100"
          :status="loginError ? 'error' : ''"
          @blur="validateAndSave"
        />
        <small v-if="loginError" class="error-message">{{ loginError }}</small>
      </div>

      <div class="form-item" v-if="localAccount.type === 'Локальная'">
        <label>Пароль</label>
        <ElInput
          v-model="localAccount.password"
          type="password"
          placeholder="Пароль (обязательно, максимум 100 символов)"
          :maxlength="100"
          :status="passwordError ? 'error' : ''"
          show-password
          @blur="validateAndSave"
        />
        <small v-if="passwordError" class="error-message">{{ passwordError }}</small>
      </div>
    </div>

    <div class="actions">
      <ElButton
        type="danger"
        @click="dialogVisible = true"
        :icon="Delete"
        plain
      >
        Удалить
      </ElButton>
    </div>

    <ElDialog
      v-model="dialogVisible"
      title="Подтверждение удаления"
      width="30%"
      center
    >
      <ElAlert
        type="warning"
        :closable="false"
        show-icon
      >
        <p>Вы уверены, что хотите удалить эту учетную запись?</p>
        <p v-if="localAccount.login">Логин: <strong>{{ localAccount.login }}</strong></p>
      </ElAlert>
      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="dialogVisible = false">Отмена</ElButton>
          <ElButton type="danger" @click="deleteAccount">Подтвердить</ElButton>
        </span>
      </template>
    </ElDialog>
  </ElCard>
</template>

<style scoped>
.account-item {
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-item label {
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.input-with-tooltip {
  position: relative;
  width: 100%;
}

.w-100 {
  width: 100%;
}

.tooltip-icon {
  cursor: pointer;
  color: var(--el-color-primary);
}

.error-message {
  color: var(--el-color-danger);
  font-size: 0.8rem;
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>