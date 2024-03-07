import { lazy } from 'react';

export const Channels = lazy(() => import('./channels'));
export const Login = lazy(() => import('./login'));
export const SettingProfiles = lazy(() => import('./setting-profiles'));
export const Register = lazy(() => import('./register'));
export const ForgotPassword = lazy(() => import('./forgot-password'));
export const SetPassword = lazy(() => import('./set-password'));
export const Profiles = lazy(() => import('./setting-profiles'));
export const Mail = lazy(() => import('./setting-mail'));
export const Help = lazy(() => import('./help'));
