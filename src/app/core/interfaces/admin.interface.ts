import {IPagination} from './paginate-list.interface';
import {IRole} from './role.interface';

export interface IAdminList {
  data: IAdmin[];
  pagination: IPagination;
}

export interface IAdmin {
  id?: string;
  login_id?: string;
  full_name?: string;
  roles?: IRole[] | any;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}
