import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { API_CONFIG } from 'shared/constants/api';
import { IUserData } from 'shared/interface';
import AuthService from 'shared/services/auth.service';
import HttpService from 'shared/services/http.service';

// Define the shape of the context
interface AuthContextType {
    user: IUserData | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUserData | null>(AuthService.getAuthData());

    const login = (email: string, password: string) => {
        HttpService.post(API_CONFIG.login, { email, password })
            .then((response) => {
                AuthService.setAuthData(response.data);
                setUser(response.data);
            })
            .catch((e) => console.error('Login failed:', e));
    };

    const logout = () => {
        AuthService.removeAuthData();
        setUser(null);
    };

    const auth = useMemo(() => ({ user, login, logout }), [user]);

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
