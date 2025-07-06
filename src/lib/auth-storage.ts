// Mock authentication functions using localStorage
// These will be replaced with actual API calls later

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'ADMIN' | 'BUS_OPERATOR' | 'PASSENGER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  error?: string;
}

// Storage keys
const USERS_KEY = 'eticket_users';
const CURRENT_USER_KEY = 'eticket_current_user';

// Helper function to generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Helper function to get all users from localStorage
const getUsers = (): User[] => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error reading users from localStorage:', error);
    return [];
  }
};

// Helper function to save users to localStorage
const saveUsers = (users: User[]): void => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};

// Helper function to get current user from localStorage
const getCurrentUserFromStorage = (): User | null => {
  try {
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (error) {
    console.error('Error reading current user from localStorage:', error);
    return null;
  }
};

// Helper function to save current user to localStorage
const saveCurrentUser = (user: User | null): void => {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (error) {
    console.error('Error saving current user to localStorage:', error);
  }
};

// Initialize with demo users if none exist
const initializeDemoUsers = (): void => {
  const users = getUsers();
  if (users.length === 0) {
    const demoUsers: User[] = [
      {
        id: 'admin-1',
        email: 'admin@e-ticket.com',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567890',
        role: 'ADMIN',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'operator-1',
        email: 'operator@e-ticket.com',
        firstName: 'Bus',
        lastName: 'Operator',
        phone: '+1234567891',
        role: 'BUS_OPERATOR',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'passenger-1',
        email: 'passenger@e-ticket.com',
        firstName: 'John',
        lastName: 'Passenger',
        phone: '+1234567892',
        role: 'PASSENGER',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    saveUsers(demoUsers);
    
    // Also store demo passwords separately (in real app, these would be hashed)
    const passwords = {
      'admin@e-ticket.com': 'admin123',
      'operator@e-ticket.com': 'operator123',
      'passenger@e-ticket.com': 'passenger123',
    };
    localStorage.setItem('eticket_demo_passwords', JSON.stringify(passwords));
  }
};

// Register a new user
export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: 'PASSENGER' | 'BUS_OPERATOR';
}): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    const users = getUsers();
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      return {
        success: false,
        message: 'User with this email already exists.',
        error: 'EMAIL_EXISTS'
      };
    }

    // Create new user
    const newUser: User = {
      id: generateId(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      role: userData.role,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save user
    users.push(newUser);
    saveUsers(users);

    // Store password separately (in real app, this would be hashed)
    const passwords = JSON.parse(localStorage.getItem('eticket_demo_passwords') || '{}');
    passwords[userData.email] = userData.password;
    localStorage.setItem('eticket_demo_passwords', JSON.stringify(passwords));

    // Set as current user
    saveCurrentUser(newUser);

    return {
      success: true,
      message: 'User registered successfully.',
      user: newUser
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Registration failed. Please try again.',
      error: 'REGISTRATION_FAILED'
    };
  }
};

// Login user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    initializeDemoUsers(); // Ensure demo users exist
    
    const users = getUsers();
    const passwords = JSON.parse(localStorage.getItem('eticket_demo_passwords') || '{}');
    
    // Find user by email
    const user = users.find(u => u.email === credentials.email);
    
    if (!user || !user.isActive) {
      return {
        success: false,
        message: 'Invalid email or password.',
        error: 'INVALID_CREDENTIALS'
      };
    }

    // Check password
    const storedPassword = passwords[credentials.email];
    if (storedPassword !== credentials.password) {
      return {
        success: false,
        message: 'Invalid email or password.',
        error: 'INVALID_CREDENTIALS'
      };
    }

    // Set as current user
    saveCurrentUser(user);

    return {
      success: true,
      message: 'Login successful.',
      user
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Login failed. Please try again.',
      error: 'LOGIN_FAILED'
    };
  }
};

// Logout user
export const logoutUser = async (): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    saveCurrentUser(null);
    return {
      success: true,
      message: 'Logout successful.'
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      message: 'Logout failed. Please try again.',
      error: 'LOGOUT_FAILED'
    };
  }
};

// Get current user
export const getCurrentUser = async (): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const user = getCurrentUserFromStorage();
    
    if (!user) {
      return {
        success: false,
        message: 'No user is currently logged in.',
        error: 'NOT_AUTHENTICATED'
      };
    }

    // Verify user still exists and is active
    const users = getUsers();
    const currentUser = users.find(u => u.id === user.id);
    
    if (!currentUser || !currentUser.isActive) {
      saveCurrentUser(null); // Clear invalid user
      return {
        success: false,
        message: 'User session is invalid.',
        error: 'INVALID_SESSION'
      };
    }

    return {
      success: true,
      message: 'User retrieved successfully.',
      user: currentUser
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return {
      success: false,
      message: 'Failed to retrieve user information.',
      error: 'GET_USER_FAILED'
    };
  }
};

// Update user profile
export const updateUserProfile = async (updates: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    const currentUser = getCurrentUserFromStorage();
    if (!currentUser) {
      return {
        success: false,
        message: 'User not authenticated.',
        error: 'NOT_AUTHENTICATED'
      };
    }

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
      return {
        success: false,
        message: 'User not found.',
        error: 'USER_NOT_FOUND'
      };
    }

    // Update user
    const updatedUser = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    users[userIndex] = updatedUser;
    saveUsers(users);
    saveCurrentUser(updatedUser);

    return {
      success: true,
      message: 'Profile updated successfully.',
      user: updatedUser
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      message: 'Failed to update profile.',
      error: 'UPDATE_FAILED'
    };
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const user = getCurrentUserFromStorage();
  return user !== null;
};

// Get user role
export const getUserRole = (): string | null => {
  const user = getCurrentUserFromStorage();
  return user ? user.role : null;
};

// Initialize demo users on module load
initializeDemoUsers();