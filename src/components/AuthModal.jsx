import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
    HiXMark,
    HiChevronDown,
    HiPhone
} from 'react-icons/hi2';
import {
    FaGoogle,
    FaApple
} from 'react-icons/fa';
import {
    registerPassenger,
    loginPassenger,
    verifyOTPPassenger,
    resendOTPPassenger,
    saveAuth
} from '../api/authApi';

const AuthModal = ({ isOpen, onClose, onAuthSuccess, initialStep = 'phone' }) => {
    const [step, setStep] = useState(initialStep); // 'phone' (signup), 'login', 'otp'

    // --- Register form state ---
    const [regForm, setRegForm] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const [regLoading, setRegLoading] = useState(false);
    const [regError, setRegError] = useState('');

    // --- Login form state ---
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    // --- OTP state ---
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setStep(initialStep);
        }
    }, [isOpen, initialStep]);

    const handleRegister = async () => {
        setRegError('');
        if (!regForm.first_name.trim() || !regForm.last_name.trim()) {
            setRegError('Please enter both your first and last name.');
            return;
        }
        if (!regForm.gender) {
            setRegError('Please select your gender.');
            return;
        }
        if (!regForm.phone.trim()) {
            setRegError('Please enter your phone number.');
            return;
        }
        if (!regForm.email.trim()) {
            setRegError('Please enter your email address.');
            return;
        }
        if (regForm.password.length < 8) {
            setRegError('Password must be at least 8 characters long.');
            return;
        }
        if (regForm.password !== regForm.confirm_password) {
            setRegError('Passwords do not match.');
            return;
        }

        setRegLoading(true);
        try {
            const res = await registerPassenger({
                name: `${regForm.first_name} ${regForm.last_name}`,
                first_name: regForm.first_name,
                last_name: regForm.last_name,
                gender: regForm.gender,
                phone: regForm.phone.replace(/[^0-9+]/g, ''),
                email: regForm.email,
                password: regForm.password,
                password_confirmation: regForm.confirm_password,
            });
            const token = res.data?.token || res.token || res.data?.access_token || res.access_token;
            const user = res.data?.user || res.user || res.data?.data || res.data;
            if (token) {
                saveAuth(token, user);
                onAuthSuccess();
            } else {
                // If no token (dummy OTP flow), try to log in automatically
                try {
                    const loginRes = await loginPassenger({
                        email: regForm.email,
                        password: regForm.password
                    });
                    const lToken = loginRes.data?.token || loginRes.token || loginRes.data?.access_token || loginRes.access_token;
                    const lUser = loginRes.data?.user || loginRes.user || loginRes.data?.data || loginRes.data;
                    if (lToken) {
                        saveAuth(lToken, lUser);
                        onAuthSuccess();
                    } else {
                        // If still no token, just succeed (dummy)
                        onAuthSuccess();
                    }
                } catch (loginErr) {
                    // If auto-login fails, just go to login step
                    setStep('login');
                }
            }
        } catch (err) {
            const errorData = err.response?.data || err;
            console.error('REGISTRATION ERROR:', JSON.stringify(errorData, null, 2));
            const msg = errorData.message || (errorData.errors ? Object.values(errorData.errors)[0][0] : null) || 'Registration failed. Please try again.';
            setRegError(msg);
        } finally {
            setRegLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoginError('');
        setLoginLoading(true);
        try {
            // Backend expects 'email' field even if it's a phone number
            const res = await loginPassenger({
                email: loginForm.email,
                password: loginForm.password
            });
            const token = res.data?.token || res.token || res.data?.access_token || res.access_token;
            const user = res.data?.user || res.user || res.data?.data || res.data;
            saveAuth(token, user);
            onAuthSuccess();
        } catch (err) {
            const errorData = err.response?.data || err;
            console.error('LOGIN ERROR:', JSON.stringify(errorData, null, 2));
            const msg = errorData.message || (errorData.errors ? Object.values(errorData.errors)[0][0] : null) || 'Invalid credentials. Please try again.';
            setLoginError(msg);
        } finally {
            setLoginLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        setOtpError('');
        setOtpLoading(true);
        try {
            const code = otp.join('');
            const res = await verifyOTPPassenger({ phone: regForm.phone, otp: code });
            if (res.status) {
                const token = res.data?.token || res.token;
                const user = res.data?.user || res.user;
                saveAuth(token, user);
                onAuthSuccess();
            } else {
                setOtpError('Verification failed. Invalid code.');
            }
        } catch (err) {
            const errorData = err.response?.data || err;
            const msg = errorData.message || Object.values(errorData.errors || {})?.[0]?.[0] || 'Verification failed.';
            setOtpError(msg);
        } finally {
            setOtpLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            await resendOTPPassenger({ phone: regForm.phone });
            toast.success('OTP resent successfully!');
        } catch (err) {
            toast.error('Failed to resend OTP.');
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    if (!isOpen) return null;

    const renderSignup = () => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-[2rem] p-6 sm:p-10 w-full max-w-lg relative animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto modal-scroll">
                <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-black transition-colors">
                    <HiXMark className="text-2xl" />
                </button>

                <h2 className="text-lg audiowide-regular uppercase text-[#0E0E0E] mb-2">Sign Up</h2>

                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={regForm.first_name}
                                onChange={e => setRegForm({ ...regForm, first_name: e.target.value })}
                                className="w-full bg-zinc-100/80 border-none rounded-xl p-3 outline-none text-sm font-medium placeholder:text-zinc-400 focus:bg-zinc-100 transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={regForm.last_name}
                                onChange={e => setRegForm({ ...regForm, last_name: e.target.value })}
                                className="w-full bg-zinc-100/80 border-none rounded-xl p-3 outline-none text-sm font-medium placeholder:text-zinc-400 focus:bg-zinc-100 transition-all"
                            />
                        </div>
                    </div>

                    {/* Rest of inputs... simplified for brevity here but I'll include all */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Gender</label>
                        <div className="relative">
                            <select
                                value={regForm.gender}
                                onChange={e => setRegForm({ ...regForm, gender: e.target.value })}
                                className="w-full bg-zinc-100/80 border-none rounded-xl p-3 outline-none text-sm font-medium text-zinc-500 focus:bg-zinc-100 transition-all appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Phone Number</label>
                        <div className="flex bg-zinc-100/80 rounded-xl overflow-hidden">
                            <div className="flex items-center gap-1.5 px-3 border-r border-zinc-200">
                                <span className="text-lg">🇵🇰</span>
                            </div>
                            <input
                                type="tel"
                                placeholder="+92 3XX XXXXXXX"
                                value={regForm.phone}
                                onChange={e => setRegForm({ ...regForm, phone: e.target.value })}
                                className="w-full bg-transparent border-none p-3 outline-none text-sm font-medium placeholder:text-zinc-400"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={regForm.email}
                            onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                            className="w-full bg-zinc-100/80 border-none rounded-xl p-3 outline-none text-sm font-medium placeholder:text-zinc-400 focus:bg-zinc-100 transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={regForm.password}
                            onChange={e => setRegForm({ ...regForm, password: e.target.value })}
                            className="w-full bg-zinc-100/80 border-none rounded-xl p-3 outline-none text-sm font-medium placeholder:text-zinc-400 focus:bg-zinc-100 transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={regForm.confirm_password}
                            onChange={e => setRegForm({ ...regForm, confirm_password: e.target.value })}
                            className="w-full bg-zinc-100/80 border-none rounded-xl p-3 outline-none text-sm font-medium placeholder:text-zinc-400 focus:bg-zinc-100 transition-all"
                        />
                    </div>

                    {regError && <p className="text-xs text-red-500 font-medium bg-red-50 rounded-xl px-3 py-2">{regError}</p>}

                    <button
                        onClick={handleRegister}
                        disabled={regLoading}
                        className="w-full bg-[#1660C3] text-white py-3.5 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-blue-100 active:scale-95 transition-all mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {regLoading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div className="text-center space-y-3 pt-1">
                        <p className="text-[10px] text-zinc-400 leading-tight px-1 uppercase tracking-tighter">
                            Already have an account? <span onClick={() => setStep('login')} className="text-[#1660C3] font-bold cursor-pointer hover:underline">Log In</span>
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="hover:scale-110 transition-transform text-[#1660C3]"><FaGoogle className="text-3xl sm:text-4xl" /></button>
                            <button className="hover:scale-110 transition-transform text-black"><FaApple className="text-3xl sm:text-4xl" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLogin = () => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-[2rem] p-10 w-full max-w-md relative animate-in fade-in zoom-in duration-300">
                <button onClick={onClose} className="absolute top-8 right-8 text-zinc-400 hover:text-black transition-colors">
                    <HiXMark className="text-2xl" />
                </button>
                <h2 className="text-lg audiowide-regular uppercase text-[#0E0E0E] mb-2">Log In</h2>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Email or Phone</label>
                        <input
                            type="text"
                            placeholder="Enter email or phone number"
                            value={loginForm.email}
                            onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                            className="w-full bg-zinc-100/80 border-none rounded-xl p-3 outline-none text-sm font-medium placeholder:text-zinc-400 focus:bg-zinc-100 transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                            className="w-full bg-zinc-100/80 border-none rounded-xl p-3 outline-none text-sm font-medium placeholder:text-zinc-400 focus:bg-zinc-100 transition-all"
                        />
                    </div>
                    {loginError && <p className="text-xs text-red-500 font-medium bg-red-50 rounded-xl px-3 py-2">{loginError}</p>}
                    <button
                        onClick={handleLogin}
                        disabled={loginLoading}
                        className="w-full bg-[#1660C3] text-white py-3.5 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-blue-100 active:scale-95 transition-all mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loginLoading ? 'Logging in...' : 'Log In'}
                    </button>
                    <div className="text-center space-y-3 pt-1">
                        <p className="text-[10px] text-zinc-400 leading-tight px-1 uppercase tracking-tighter">
                            Don't have an account? <span onClick={() => setStep('phone')} className="text-[#1660C3] font-bold cursor-pointer hover:underline">Sign Up</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOTP = () => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
            <div className="bg-white rounded-[2rem] p-10 w-full max-w-lg relative animate-in fade-in zoom-in duration-300 text-center">
                <button onClick={onClose} className="absolute top-8 right-8 text-zinc-400 hover:text-black transition-colors"><HiXMark className="text-2xl" /></button>
                <div className="mb-6"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><HiPhone className="text-3xl text-[#1660C3]" /></div></div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 dm-sans">Verify your number</h2>
                <p className="text-zinc-500 mb-8 dm-sans">We've sent a 6-digit code to <span className="font-bold text-zinc-900">{regForm.phone}</span></p>
                <div className="flex justify-between gap-2 sm:gap-3 mb-8">
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            id={`otp-${idx}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            className="w-10 h-12 sm:w-12 sm:h-14 bg-zinc-100 border-none rounded-xl text-center text-xl font-bold text-[#1660C3] outline-none focus:ring-2 focus:ring-[#1660C3] transition-all dm-sans"
                            autoComplete="off"
                        />
                    ))}
                </div>
                {otpError && <p className="text-red-500 text-sm mb-6 dm-sans">{otpError}</p>}
                <button
                    onClick={handleVerifyOTP}
                    disabled={otpLoading}
                    className={`w-full py-4 rounded-xl font-bold dm-sans transition-all mb-6 flex items-center justify-center shadow-lg shadow-blue-200 ${otpLoading ? 'bg-zinc-100 text-zinc-400' : 'bg-[#1660C3] text-white hover:bg-blue-700 active:scale-[0.98]'}`}
                >
                    {otpLoading ? <div className="w-6 h-6 border-2 border-zinc-400 border-t-zinc-100 rounded-full animate-spin" /> : 'Verify & Login'}
                </button>
                <div className="text-zinc-500 dm-sans text-sm">
                    Didn't receive code? <button onClick={handleResendOTP} className="text-[#1660C3] font-bold hover:underline">Resend</button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {step === 'phone' && renderSignup()}
            {step === 'login' && renderLogin()}
            {step === 'otp' && renderOTP()}
        </>
    );
};

export default AuthModal;
