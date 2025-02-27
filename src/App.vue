<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
</script>

<template>
  <ElConfigProvider>
    <div class="app-container">
      <AccountForm />
    </div>
  </ElConfigProvider>
</template>

<style>
:root {
  --el-color-primary: #409eff;
}

body {
  margin: 0;
  font-family: var(--el-font-family);
  background-color: #f5f7fa;
}

.app-container {
  padding: 20px;
  min-height: 100vh;
}

@media (max-width: 600px) {
  .app-container {
    padding: 10px;
  }
}
</style>