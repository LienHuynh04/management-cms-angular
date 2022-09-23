import { ColumnConfig } from '../core/interfaces';

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
    },
    {
      header: 'Ngày tạo',
      field: 'created_at'
    },
    {
      header: 'Ngày cập nhật',
      field: 'updated_at'
    },
  ],
  staff: [
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
    {
      header: 'Phân quyền',
      field: 'role',
      slot: 'role'
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
      field: 'name',
      slot: 'role'
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
      field: 'leader.full_name',
    },
    {
      header: 'Mô tả',
      field: 'description'
    }
  ],
};

