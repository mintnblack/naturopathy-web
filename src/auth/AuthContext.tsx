import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  loginUser: () => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Timer for automatic logout after 30 minutes (1800000 milliseconds)
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

  const setTimer = () => {
    // Clear existing timer
    if (logoutTimer) clearTimeout(logoutTimer);

    // Set a new timer
    const timer = setTimeout(() => {
      console.log("Session timed out, logging out...");
      logoutUser();  // Use logoutUser to centralize the logout logic
    }, 10000); // 30 minutes

    setLogoutTimer(timer);
  };

  const loginUser = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');  // Set a flag in localStorage
    setTimer();
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    if (logoutTimer) clearTimeout(logoutTimer);
    localStorage.removeItem('isAuthenticated');  // Clear specific data
    localStorage.clear();  // Alternatively, clear all localStorage data
  };

  useEffect(() => {
    // Automatically log in if localStorage indicates the user was authenticated
    if (localStorage.getItem('isAuthenticated') === 'true') {
      setIsAuthenticated(true);
      setTimer();
    }

    // Clean up the timer on unmount
    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [logoutTimer]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
