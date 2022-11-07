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
      header: 'Nhóm',
      field: 'team',
      field_child: 'name'
    },
    {
      header: 'Phân quyền',
      field: 'role',
      slot: 'role'
    },
  ],
  project: [
    {
      header: 'STT',
      field: 'stt',
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
  role: [
    {
      header: 'STT',
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
      header: 'Tên nhân viên',
      field: 'staff_name'
    },
    {
      header: 'Email nhân viên',
      field: 'staff_email'
    },
    {
      header: 'Ngày tạo',
      field: 'created_at',
      slot: 'datetime'
    }
  ],
  team: [
    {
      header: 'Tên nhóm',
      field: 'name',
    },
    {
      header: 'Trưởng nhóm',
      field: 'leader'
    },
    {
      header: 'Mô tả',
      field: 'description'
    }
  ],
};

