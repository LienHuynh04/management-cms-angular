import { StaffInterface } from './staff.interface';
import { CustomerInterface } from './customer.interface';

export interface CareInterface {
  id: string;
  customer_id: string;
  staff_id: string;
  staff_email: string;
  staff_login_id: string;
  staff_name: string;
  created_at: string;
  description: string;
  staff: StaffInterface;
  customer: CustomerInterface;
}
