import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { IUserData } from 'shared/interface';
import AuthService from 'shared/services/auth.service';

// Define the shape of the context
interface AuthContextType {
    user: IUserData | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUserData | null>(AuthService.getAuthData());

    const login = (username: string, password: string) => {
        if (username === 'test' && password === 'test') {
            const authData: IUserData = {
                id: '123',
                name: 'username',
                email: 'test@123',
                token: 'hello',
            };

            console.log('Login successful:', authData);
            AuthService.setAuthData(authData);
            setUser(authData);
            return true;
        }
        return false;
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
