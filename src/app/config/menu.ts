import { NavbarItem } from '../core/interfaces';

export const navigations: NavbarItem[] = [
  {
    title: 'Trang chủ',
    url: '/dashboard',
    icon: 'home'
  },
  {
    title: 'Khách hàng',
    url: '/customers',
    icon: 'user',
    permissions: {
      only: ['admin', 'marketing', 'sales', 'agency', 'cooperator', 'sales-manager']
    }
  },
  {
    title: 'Phòng kinh doanh',
    url: '/teams',
    icon: 'dollar-circle',
    permissions: {
      only: ['admin']
    }
  },
  {
    title: 'Nhân viên',
    url: '/staff',
    icon: 'team',
    permissions: {
      only: ['admin', 'human-resource', 'sales-manager']
    }
  },
  {
    title: 'Dự án',
    url: '/project',
    icon: 'project',
    permissions: {
      only: ['admin', 'marketing', 'sales', 'agency', 'cooperator', 'sales-manager']
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

