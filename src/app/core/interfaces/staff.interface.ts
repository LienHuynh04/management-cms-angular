export interface StaffInterface {
  id: number;
  login_id: string | number;
  full_name: string;
  email: string;
  phone: number;
  role: any[];
  is_active: number;
  team_id: number;
}
