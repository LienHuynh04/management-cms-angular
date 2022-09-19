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
      field: 'id',
      style: {
        width: '100px'
      }
    },
    {
      header: 'Tên',
      field: 'name',
      style: {
        width: '400px'
      }
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
      field: 'id',
      style: {
        width: '100px'
      }
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
  team: [
    {
      header: 'Tên nhóm',
      field: 'name',
    },
    {
      header: 'Trưởng nhóm',
      field: 'leader',
    },
    {
      header: 'Mô tả',
      field: 'description'
    }
  ],
};

