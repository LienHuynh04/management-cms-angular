interface Endpoint {
  login: string;
  profile: string;
  logout: string;
  customer: string;
  project: string;
  user: string;
  customer_care: string;
  role: string;
  [key: string]: string;
}

export const apiEndpoints: Endpoint = {
  login: 'auth/login',
  profile: 'auth/me',
  logout: 'auth/logout',
  customer: 'customers',
  project: 'projects',
  user: 'users',
  customer_care: 'cares',
  role: 'roles',
};

