import type { IAccount } from "../types/";

export function useValidation() {
  const errors = ref<{ [key: string]: string }>({});

  function validate(account: IAccount) {
    errors.value = {};

    if (!account.login.trim()) {
      errors.value.login = "Логин обязателен";
    } else if (account.login.length > 100) {
      errors.value.login = "Максимум 100 символов";
    }

    if (account.type === "Локальная") {
      if (!account.password) {
        errors.value.password = "Пароль обязателен";
      } else if (typeof account.password === 'string' && account.password.length > 100) {
        errors.value.password = "Максимум 100 символов";
      }
    }

    if (typeof account.label === 'string' && account.label.length > 50) {
      errors.value.label = "Максимум 50 символов";
    } else if (Array.isArray(account.label)) {
      const labelString = account.label.map(item => item.text).join('; ');
      if (labelString.length > 50) {
        errors.value.label = "Максимум 50 символов";
      }
    }

    return Object.keys(errors.value).length === 0;
  }

  return { errors, validate };
}