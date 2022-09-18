import {NavbarItem} from '../core/interfaces';

export const navigations: NavbarItem[] = [
  {
    title: 'Thông tin cá nhân',
    url: '/profile',
    icon: 'user'
  },
  {
    title: 'Quản lý khách hàng',
    url: '/customers',
    icon: 'team',
    permissions: {
      only: ['admin', 'marketing', 'sales', 'agency', 'cooperator']
    }
  },
  {
    title: 'Nhân sự',
    url: '/users',
    icon: 'user',
    permissions: {
      only: ['admin', 'human-resource']
    }
  },
  {
    title: 'Dự án',
    url: '/project',
    icon: 'project',
    permissions: {
      only: ['admin', 'marketing', 'sales', 'agency', 'cooperator']
    }
  },
  {
    title: 'Chăm sóc khách hàng',
    url: '/customer-care',
    icon: 'check-square',
    permissions: {
      only: ['admin', 'sales', 'agency', 'cooperator']
    }
  },
  {
    title: 'Phân quyền',
    url: '/roles',
    icon: 'apartment',
    permissions: {
      only: ['admin']
    }
  }
];

