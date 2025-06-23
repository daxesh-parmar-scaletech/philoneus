import { useState } from 'react';
import { IUserData } from 'shared/interface';

import AuthService from 'shared/services/auth.service';

export function useAuth() {
    const [user, setUser] = useState<IUserData | null>(AuthService.getAuthData());

    const login = (username: string, password: string) => {
        if (username === 'test' && password === 'test') {
            const authData = {
                id: '123',
                name: 'username',
                email: 'test@123',
                token: 'hello',
            };

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

    return { user, login, logout };
}
