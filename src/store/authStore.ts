/**
 * CollaboNotes - Authentication Store
 * Author: Mehdi
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { MOCK_USERS } from '@/mocks/data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Mock authentication - always succeeds
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const user = MOCK_USERS.find(u => u.email === email) || MOCK_USERS[0];
        
        set({
          user,
          isAuthenticated: true,
        });
      },

      register: async (name: string, email: string, password: string) => {
        // Mock registration
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          color: '#00D9FF',
        };
        
        set({
          user: newUser,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'collabonotes-auth',
    }
  )
);
