import type { AccountWithoutId } from "../types/";

export const useAccountStore = defineStore("account", () => {
  const accounts = ref<AccountWithoutId[]>([]);

  const addAccount = () => {
    accounts.value.push({
      label: "",
      type: "LDAP",
      login: "",
      password: null,
    });
  };

  const updateAccount = (index: number, account: AccountWithoutId) => {
    accounts.value[index] = account;
  };

  const deleteAccount = (index: number) => {
    accounts.value.splice(index, 1);
  };

  return { accounts, addAccount, updateAccount, deleteAccount };
});