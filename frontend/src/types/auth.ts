export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    profile_image?: string;
  }
  
  export enum UserRole {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    LAB_TECHNICIAN = 'lab_technician',
    STOREKEEPER = 'storekeeper',
    LIBRARIAN = 'librarian',
  }
  
  export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (user: User) => void;
  }