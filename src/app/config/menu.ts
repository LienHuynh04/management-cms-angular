import { NavbarItem } from '../core/interfaces';
import { ROLE_CONFIG } from './role-config';

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
      only: ROLE_CONFIG.get('customers')?.concat(['human-resource']),
    }
  },
  {
    title: 'Phòng kinh doanh',
    url: '/teams',
    icon: 'dollar-circle',
    permissions: {
      only: ROLE_CONFIG.get('teams')
    }
  },
  {
    title: 'Nhân viên',
    url: '/staff',
    icon: 'team',
    permissions: {
      only: ROLE_CONFIG.get('staff')?.concat(['marketing', 'sales', 'human-resource'])
    }
  },
  {
    title: 'Dự án',
    url: '/project',
    icon: 'project',
    permissions: {
      only: ROLE_CONFIG.get('project')
    }
  },
  {
    title: 'Sản phẩm chuyển nhượng',
    url: '/project-new',
    icon: 'file-protect',
    permissions: {
      only: ROLE_CONFIG.get('project-new')
    }
  },
  {
    title: 'Phân quyền',
    url: '/roles',
    icon: 'apartment',
    permissions: {
      only: ROLE_CONFIG.get('roles')
    }
  }
];

