import { UserInterface } from './user.interface';
import { CustomerInterface } from './customer.interface';

export interface CustomerCareInterface {
  id: string | number;
  customer_id: string;
  staff_id: string;
  description: string;
  staff: UserInterface;
  customer: CustomerInterface;
}
