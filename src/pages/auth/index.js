import { lazy } from 'react';

const Login = lazy(() => import('./Login'))
const Register = lazy(() => import('./Register'))
const ForgotPassword = lazy(() => import('./ForgotPassword'))
const Otp = lazy(() => import('./OtpPage'))

export { Login, Register, ForgotPassword, Otp };
