export interface User {
  username: string;
  password: string;
  fullName: string;
}

export interface CRUDItem {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}