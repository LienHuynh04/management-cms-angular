import {NavbarItem} from '../core/interfaces';

export const navigations: NavbarItem[] = [
  {
    title: 'Trang chủ',
    url: '/dashboard',
    icon: 'home'
  },
  {
    title: 'Khách hàng',
    url: '/customers',
    icon: 'team',
    permissions: {
      only: ['admin', 'marketing', 'sales', 'agency', 'cooperator']
    }
  },
  {
    title: 'Phòng kinh doanh',
    url: '/teams',
    icon: 'team',
    permissions: {
      only: ['admin']
    }
  },
  {
    title: 'Nhân viên',
    url: '/staff',
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
    title: 'Phân quyền',
    url: '/roles',
    icon: 'apartment',
    permissions: {
      only: ['admin']
    }
  },
  {
    title: 'Thống kê',
    url: '/bar-chart',
    icon: 'bar-chart',
    permissions: {
      only: ['admin']
    }
  }
];

