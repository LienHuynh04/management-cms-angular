export interface StaffInterface {
  id: number;
  login_id: string | number;
  full_name: string;
  email: string;
  role: any[];
  is_active?: any;
}
