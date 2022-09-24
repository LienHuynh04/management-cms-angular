import { StaffInterface } from './staff.interface';
import { CustomerInterface } from './customer.interface';

export interface CareInterface {
  id: any;
  customer_id: string;
  staff_id: string;
  description: string;
  staff: StaffInterface;
  customer: CustomerInterface;
}
