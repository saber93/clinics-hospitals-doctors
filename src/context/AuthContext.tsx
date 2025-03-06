
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Client, Vendor, Admin } from '../types';
import { mockData } from '../data/mockData';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  isClient: () => boolean;
  isVendor: () => boolean;
  isAdmin: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    setIsLoading(true);
    
    // In a real app, this would be an API call to authenticate
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        // Find user in mock data
        const allUsers = [
          ...mockData.users.clients,
          ...mockData.users.vendors,
          ...mockData.users.admins
        ];

        const foundUser = allUsers.find(u => u.email === email);
        
        if (foundUser && password === 'password') { // For demo, any password works
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    // Simulate API call for registration
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user already exists
        const allUsers = [
          ...mockData.users.clients,
          ...mockData.users.vendors,
          ...mockData.users.admins
        ];
        
        const userExists = allUsers.some(u => u.email === userData.email);
        
        if (userExists) {
          setIsLoading(false);
          resolve(false);
        } else {
          // In a real app, we would create user via API
          // Simplified mock implementation
          const newUser = {
            id: `user${Date.now()}`,
            name: userData.name || '',
            email: userData.email || '',
            role: userData.role || 'client',
            createdAt: new Date(),
            updatedAt: new Date(),
          } as User;
          
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          setIsLoading(false);
          resolve(true);
        }
      }, 1000);
    });
  };

  const isClient = () => user?.role === 'client';
  const isVendor = () => user?.role === 'vendor';
  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      register,
      isClient,
      isVendor,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
