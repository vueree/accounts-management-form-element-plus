import type { IAccount } from "../types/";

export function useFormLogic() {
  const accountStore = useAccountStore();

  const accounts = computed(() => accountStore.accounts);

  const addAccount = (account: IAccount) => {
    accountStore.addAccount(account);
  };

  const updateAccount = (updatedAccount: IAccount) => {
    accountStore.updateAccount(updatedAccount);
  };

  const deleteAccount = (id: number) => {
    accountStore.removeAccount(id);
  };

  const processLabels = (labelString: string) => {
    return labelString
      .split(';')
      .map(label => ({ text: label.trim() }))
      .filter(label => label.text);
  };

  const formatLabels = (labels: { text: string }[] | string) => {
    if (Array.isArray(labels)) {
      return labels.map(item => item.text).join('; ');
    } else if (typeof labels === 'string') {
      try {
        const parsed = JSON.parse(labels);
        if (Array.isArray(parsed)) {
          return parsed.map((item: any) => item.text).join('; ');
        }
      } catch {
        console.warn("Invalid JSON format for labels:", labels, Error);
    }
      return labels;
    }
    return "";
  };

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    processLabels,
    formatLabels
  };
}