interface Endpoint {
  login: string;
  profile: string;
  profile_update: string;
  logout: string;
  customer: string;
  project: string;
  user: string;
  customer_care: string;
  role: string;
  team: string;
  statistics: string;
  get_field_dashboard_admin: string;
  get_statistic_department: string;
  get_statistic_team: string;

  [key: string]: string;
}

export const apiEndpoints: Endpoint = {
  login: 'auth/login',
  profile: 'auth/me',
  profile_update: 'auth/update',
  logout: 'auth/logout',
  customer: 'customers',
  project: 'projects',
  user: 'users',
  customer_care: 'cares',
  role: 'roles',
  team: 'teams',
  statistics: 'statistics',
  get_field_dashboard_admin: 'get-field',
  get_statistic_department: 'get-statistic-by-department',
  get_statistic_team: 'get-statistic-by-team',
};

