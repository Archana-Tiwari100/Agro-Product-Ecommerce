"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

type SignupData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (data: SignupData) => { success: boolean; message: string };
  logout: () => void;
  registeredUser: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUser, setRegisteredUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("agro-user");
      const storedRegisteredUser = localStorage.getItem("agro-registered-user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedRegisteredUser) {
        setRegisteredUser(JSON.parse(storedRegisteredUser));
      }
    } catch (error) {
      console.error("Failed to read auth data from localStorage", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    if (!registeredUser) {
      return false;
    }

    if (
      email === registeredUser.email &&
      password === registeredUser.password
    ) {
      setUser(registeredUser);
      localStorage.setItem("agro-user", JSON.stringify(registeredUser));
      return true;
    }

    return false;
  };

  const signup = (data: SignupData) => {
    const existing = localStorage.getItem("agro-registered-user");

    if (existing) {
      const parsed: User = JSON.parse(existing);

      if (parsed.email === data.email) {
        return {
          success: false,
          message: "Account already exists with this email",
        };
      }
    }

    const newUser: User = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
    };

    setRegisteredUser(newUser);
    setUser(newUser);

    localStorage.setItem("agro-registered-user", JSON.stringify(newUser));
    localStorage.setItem("agro-user", JSON.stringify(newUser));

    return {
      success: true,
      message: "Signup successful",
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agro-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isHydrated,
        login,
        signup,
        logout,
        registeredUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}