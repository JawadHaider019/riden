import api from './api';


export const saveAuth = (token, user) => {
    if (token) {
        const tokenString = typeof token === 'object' ? (token.token || token.access_token || JSON.stringify(token)) : token;
        localStorage.setItem('riden_token', tokenString);
    }
    if (user) {
        localStorage.setItem('riden_user', JSON.stringify(user));
    }
};

export const getToken = () => localStorage.getItem('riden_token');
export const getUser = () => {
    const u = localStorage.getItem('riden_user');
    return u ? JSON.parse(u) : null;
};

export const clearAuth = () => {
    localStorage.removeItem('riden_token');
    localStorage.removeItem('riden_user');
};

/**
 * Register a new passenger
 * POST /passenger/register
 */
export const registerPassenger = async (data) => {
    const res = await api.post('/passenger/register', data);
    return res.data;
};


export const loginPassenger = async (data) => {
    const res = await api.post('/passenger/login', data);
    return res.data;
};


export const verifyOTPPassenger = async (data) => {
    const res = await api.post('/passenger/verify-otp', data);
    return res.data;
};

/**
 * Resend OTP
 */
export const resendOTPPassenger = async (data) => {
    const res = await api.post('/passenger/resend-otp', data);
    return res.data;
};


export const getPassengerProfile = async () => {
    const res = await api.get('/passenger/profile');
    return res.data;
};

export const logoutPassenger = async () => {
    try {
        await api.post('/passenger/logout');
    } catch (err) {
        console.error('Logout API failed', err);
    } finally {
        clearAuth();
    }
};

/**
 * Update Passenger Profile
 * POST /passenger/profile/update
 */
export const updatePassengerProfile = async (data) => {
    const isFormData = data instanceof FormData;
    const res = await api.post('/passenger/profile/update', data, {
        headers: {
            ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {})
        }
    });
    return res.data;
};
