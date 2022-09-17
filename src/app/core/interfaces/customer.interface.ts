export interface CustomerInterface {
  id: string;
  full_name: string;
  phone_number: number;
  address: string;
  email: string;
  assign_for_user_id: number;
  assign_for_user: {
    id: number
  };
  project_note: string;
  note: string;
  result: string;
  customer_project: string[];
}
