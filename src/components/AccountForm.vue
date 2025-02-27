<script setup lang="ts">
import { useAccountStore } from "../stores/accountStore";
import { ElButton, ElCard } from "element-plus";
import { Plus } from '@element-plus/icons-vue';
import type { IAccount } from "../types/";

const accountStore = useAccountStore();
const accountsList = ref<HTMLElement | null>(null);

const accounts = computed(() => accountStore.accounts);

const addAccount = async () => {
  const newAccount: IAccount = {
    id: Date.now(),
    label: "",
    type: "Локальная",
    login: "",
    password: null,
  };
  accountStore.addAccount(newAccount);

  await nextTick();

  if (accountsList.value) {
    const tempElement = document.createElement("div");
    accountsList.value.appendChild(tempElement);
    tempElement.scrollIntoView({ behavior: "smooth", block: "end" });

    setTimeout(() => {
      if (tempElement.parentNode) {
        tempElement.parentNode.removeChild(tempElement);
      }
    }, 100);
  }
};

const updateAccount = (updatedAccount: IAccount) => {
  accountStore.updateAccount(updatedAccount);
};

const deleteAccount = (id: number) => {
  accountStore.removeAccount(id);
};
</script>

<template>
  <ElCard class="account-form" shadow="never">
    <template #header>
      <div class="header-container">
        <h1 class="title">Управление учетными записями</h1>
        <ElButton
          type="primary"
          size="large"
          :icon="Plus"
          @click="addAccount"
        >
          Добавить учетную запись
        </ElButton>
      </div>
    </template>

    <div ref="accountsList" class="accounts-list">
      <AccountItem
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @update:account="updateAccount"
        @delete:account="deleteAccount"
      />
    </div>
  </ElCard>
</template>

<style scoped>
.account-form {
  max-height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  overflow-y: auto;
  scrollbar-width: none;
}

.account-form::-webkit-scrollbar {
  display: none;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 600px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>