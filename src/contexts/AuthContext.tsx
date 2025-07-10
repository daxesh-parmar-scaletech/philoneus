import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import { API_CONFIG } from "shared/constants/api";
import { IUserData } from "shared/interface";
import AuthService from "shared/services/auth.service";
import HttpService from "shared/services/http.service";
import { useNavigate } from "react-router-dom";
import { registerUnauthorizedHandler } from "shared/services/http.service";

// Define the shape of the context
interface AuthContextType {
  user: IUserData | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  // role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const location = useLocation();
  // const pathname = window.location.pathname;
  const [user, setUser] = useState<IUserData | null>(AuthService.getAuthData());
  // const [role, setRole] = useState('');
  const navigate = useNavigate();

  const login = useCallback(
    (email: string, password: string) => {
      HttpService.post(API_CONFIG.login, { email, password })
        .then((response) => {
          AuthService.setAuthData(response.data as IUserData);
          setUser(response.data as IUserData);
        })
        .catch((e) => console.error("Login failed:", e));
    },
    [setUser]
  );

  const logout = useCallback(() => {
    AuthService.removeAuthData();
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    navigate("/login", { replace: true });
  }, [setUser, navigate]);

  // Register global unauthorized handler
  // This will logout and redirect to login on 401
  useEffect(() => {
    registerUnauthorizedHandler(() => {
      logout();
    });
  }, [logout]);

  // useEffect(() => {
  //     let role = 'consultant';
  //     if (pathname.startsWith('/user/')) {
  //         role = 'user';
  //     }
  //     setRole(role);
  // }, [setUser, pathname]);

  const auth = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
