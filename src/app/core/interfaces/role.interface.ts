import {IPagination} from './paginate-list.interface';

export interface IRoleList {
  data: IRole[];
  pagination: IPagination;
}

export interface IRole {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  permissions: [];
}
