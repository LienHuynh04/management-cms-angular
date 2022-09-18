import {ColumnConfig} from '../core/interfaces';

export const column: ColumnConfig = {
  customer: [
    {
      header: 'Tên',
      field: 'full_name'
    },
    {
      header: 'SĐT',
      field: 'phone_number'
    },
    {
      header: 'Địa chỉ',
      field: 'address'
    },
    {
      header: 'Email',
      field: 'email'
    },
    {
      header: 'Ghi chú dự án',
      field: 'project_note'
    },
    {
      header: 'Ghi chú',
      field: 'note'
    }
  ],
  user: [
    {
      header: 'Login ID',
      field: 'login_id'
    },
    {
      header: 'Tên',
      field: 'full_name'
    },
    {
      header: 'Email',
      field: 'email'
    },
  ],
  project: [
    {
      header: 'ID',
      field: 'id'
    },
    {
      header: 'Tên',
      field: 'name'
    }
  ],
  customer_care: [
    {
      header: 'Login ID',
      field: 'login_id'
    },
    {
      header: 'Tên',
      field: 'full_name'
    },
    {
      header: 'Email',
      field: 'email'
    },
  ],
  role: [
    {
      header: 'ID',
      field: 'id'
    },
    {
      header: 'Tên',
      field: 'name'
    }
  ],
  care: [
    {
      header: 'Nhân Viên',
      field: 'staff',
      colspan: 2
    },
    {
      header: 'Khách hàng',
      field: 'customer',
      colspan: 2
    }
  ],
};

