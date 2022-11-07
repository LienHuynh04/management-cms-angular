export interface CustomerInterface {
  id: string;
  full_name: string;
  phone_number: number;
  address: string;
  email: string;
  assign_for_user_id: number;
  assign_for_user: {
    id: number,
    full_name: string
  };
  project_note: string;
  note: string;
  result: string;
  type_project?: string;
  customer_project: any;
  care: [];
}
