import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    logout();
                } else {
                    setUser({
                        username: decoded.sub,
                        role: decoded.role || 'USER'
                    });
                }
            } catch (error) {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            const { token } = response.data;

            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser({
                username: decoded.sub,
                role: decoded.role || 'USER'
            });

            return { success: true };
        } catch (error) {
            // Check for disabled account (403)
            if (error.response?.status === 403) {
                return {
                    success: false,
                    message: error.response?.data?.message || 'Your account has been disabled. Contact admin.'
                };
            }
            return {
                success: false,
                message: error.response?.data?.message || 'Invalid username or password'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    const isAdmin = user?.role === 'ADMIN';

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAdmin }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
