import { lazy } from 'react';

const Login = lazy(() => import('./Login'))
const Register = lazy(() => import('./Register'))
const ForgotPassword = lazy(() => import('./ForgotPassword'))

export { Login, Register, ForgotPassword };
