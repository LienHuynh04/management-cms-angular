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
  customer: 'customer',
  project: 'project',
  user: 'user',
  customer_care: 'care',
  role: 'role',
};

