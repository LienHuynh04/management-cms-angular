interface Endpoint {
  login: string;
  profile: string;
  logout: string;
  [key: string]: string;
}

export const apiEndpoints: Endpoint = {
  login: 'auth/login',
  profile: 'auth/profile',
  logout: 'auth/logout'
};

