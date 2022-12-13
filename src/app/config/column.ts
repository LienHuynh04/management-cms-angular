import { ColumnConfig } from '../core/interfaces';

export const column: ColumnConfig = {
  customer: [
    {
      header: 'Ngày tạo',
      field: 'created_at'
    },
    {
      header: 'Nhân viên phụ trách',
      field: 'assign_for_user',
    },
    {
      header: 'Tên dự án',
      field: 'customer_project'
    },
    {
      header: 'Tên khách hàng',
      field: 'full_name'
    },
    {
      header: 'SĐT',
      field: 'phone_number'
    },
    {
      header: 'Email',
      field: 'email'
    },
    // {
    //   header: 'Ghi chú dự án',
    //   field: 'project_note'
    // },
    // {
    //   header: 'Ghi chú',
    //   field: 'note'
    // },
    // {
    //   header: 'Ngày cập nhật',
    //   field: 'updated_at'
    // },
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
  project_new: [
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
    },
    {
      header: 'Giá bán',
      field: 'price',
      style: {
        width: '200px'
      }
    },
    {
      header: 'Hoa hồng Sale',
      field: 'bonus',
      style: {
        width: '200px'
      }
    },
    {
      header: 'Tình trạng',
      field: 'status',
      style: {
        width: '200px'
      }
    },
    {
      header: 'Ghi chú',
      field: 'description',
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

