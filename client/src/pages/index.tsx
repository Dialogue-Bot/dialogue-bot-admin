import { lazy } from 'react'

export const Channels = lazy(() => import('./channels'))
export const Login = lazy(() => import('./login'))
export const SettingProfiles = lazy(() => import('./setting-profiles'))
export const Register = lazy(() => import('./register'))
export const ForgotPassword = lazy(() => import('./forgot-password'))
export const SetPassword = lazy(() => import('./set-password'))
export const Profiles = lazy(() => import('./setting-profiles'))
export const Mail = lazy(() => import('./setting-mail'))
export const Help = lazy(() => import('./help'))
export const Flows = lazy(() => import('./flows'))
export const FlowDetail = lazy(() => import('./flow-detail'))
export const Training = lazy(() => import('./training'))
export const AddIntent = lazy(() => import('./add-intent'))
export const UpdateIntent = lazy(() => import('./update-intent'))
export const RequestVerifyAccount = lazy(
  () => import('./request-verify-account'),
)
export const VerifyAccount = lazy(() => import('./verify-account'))
export { default as LandingPage } from './landing-page'
export const Conversations = lazy(() => import('./conversations'))
export const ConversationDetail = lazy(() => import('./conversation-detail'))
