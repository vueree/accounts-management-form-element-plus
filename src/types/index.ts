export interface IAccount {
  id: number;
  label: Label;
  type: "LDAP" | "Локальная";
  login: string;
  password: string | null;
}

export type Label = { text: string }[] | string

export type AccountWithoutId = Omit<IAccount, "id">;