import {IPagination} from './paginate-list.interface';

export interface IRoleList {
  data: IRole[];
  pagination: IPagination;
}

export interface IRole {
  id: string | number;
  name: string;
}
