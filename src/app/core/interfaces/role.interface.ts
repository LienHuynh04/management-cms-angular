export interface IRole {
  id: string | number;
  name: string;
  permission: Permission[]
}

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
}
