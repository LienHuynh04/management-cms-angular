import {ColumnConfig} from '../core/interfaces/column.interface';

export const column: ColumnConfig = {
  customer: [
    {
      header: 'Ngày cập nhật',
      field: 'updated_at',
      style: {
        width: '100px'
      }
    },
    {
      header: 'Họ và tên',
      field: 'full_name',
      style: {
        width: '200px'
      }
    },
    {
      header: 'SĐT',
      field: 'phone',
      style: {
        width: '120px'
      }
    },
    {
      header: 'Nhân viên chăm sóc',
      field: '',
      style: {
        width: '200px'
      }
    },
    {
      header: 'Địa chỉ',
      field: 'address',
      style: {
        width: '200px'
      }
    },
    {
      header: 'Email',
      field: 'email',
      style: {
        width: '150px'
      }
    },
    {
      header: 'Dự án quan tâm hoặc muốn tìm hiểu',
      field: '',
      style: {
        width: '200px'
      }
    },
    {
      header: 'Chăm Sóc Lần 1',
      field: '',
      style: {
        width: '200px'
      }
    },
    {
      header: 'Chăm Sóc Lần 2',
      field: '',
      style: {
        width: '200px'
      }
    },
    {
      header: 'Chăm Sóc Lần 3',
      field: '',
      style: {
        width: '200px'
      }
    },
    {
      header: 'Kết quả',
      field: 'result',
      style: {
        width: '200px'
      }
    }
  ]
};

