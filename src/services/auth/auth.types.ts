export type AuthMeResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
export type UpdateMeArgs = {
  avatar?: string
  name?: string
}
export type UpdateMeResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}
export type LoginResponse = {
  accessToken: string
}
export type SignUpArgs = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}
export type SIgnUpResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
export type VerifyEmailArgs = {
  code: string
}
export type ResendVerificationEmailArgs = {
  html: string
  subject: string
  userId: string
}
export type RecoverPasswordArgs = {
  email: string
  html: string
  subject: string
}
export type ResetPasswordArgs = {
  token: string
}
export type ResetPasswordResponse = {
  password: string
}
