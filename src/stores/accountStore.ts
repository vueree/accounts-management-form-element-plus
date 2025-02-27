import type { IAccount } from "../types/";

export const useAccountStore = defineStore("account", () => {
  const accounts = ref<IAccount[]>([]);

  const addAccount = (account: IAccount) => {
    accounts.value.push(account);
    saveToLocalStorage();
  };

  const removeAccount = (id: number) => {
    accounts.value = accounts.value.filter((account) => account.id !== id);
    saveToLocalStorage();
  };

  const updateAccount = (updatedAccount: IAccount) => {
    const index = accounts.value.findIndex(
      (account) => account.id === updatedAccount.id
    );
    if (index !== -1) {
      accounts.value[index] = updatedAccount;
      saveToLocalStorage();
    }
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("accounts", JSON.stringify(accounts.value));
  };

  const loadFromLocalStorage = () => {
    const savedAccounts = localStorage.getItem("accounts");
    if (savedAccounts) {
      try {
        accounts.value = JSON.parse(savedAccounts);
      } catch (error) {
        console.error("Error parsing saved accounts:", error);
        accounts.value = [];
      }
    }
  };

  loadFromLocalStorage();

  return { accounts, addAccount, removeAccount, updateAccount };
});