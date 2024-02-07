import {
  AuthMeResponse,
  LoginArgs,
  LoginResponse,
  RecoverPasswordArgs,
  ResendVerificationEmailArgs,
  ResetPasswordArgs,
  ResetPasswordResponse,
  SIgnUpResponse,
  SignUpArgs,
  UpdateCardArgs,
  UpdateCardResponse,
  UpdateMeArgs,
  UpdateMeResponse,
  VerifyEmailArgs,
  baseApi,
} from '@/services'

export const AuthService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<AuthMeResponse, void>({
        providesTags: [''],
        query: () => ({
          params: undefined,
          url: `v1/auth/me`,
        }),
      }),
      login: builder.mutation<LoginResponse, LoginArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'POST',
          params: args,
          url: `v1/auth/login`,
        }),
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: [''],
        query: () => ({
          method: 'POST',
          params: undefined,
          url: `v1/auth/logout`,
        }),
      }),
      recoverPassword: builder.mutation<void, RecoverPasswordArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'POST',
          params: args,
          url: `v1/auth/recover-password`,
        }),
      }),
      refreshToken: builder.mutation<void, void>({
        invalidatesTags: [''],
        query: () => ({
          method: 'POST',
          params: undefined,
          url: `v1/auth/refresh-token`,
        }),
      }),
      resendVerificationEmail: builder.mutation<void, ResendVerificationEmailArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'POST',
          params: args,
          url: `/v1/auth/resend-verification-email`,
        }),
      }),
      resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'POST',
          params: args,
          url: `v1/auth/reset-password/${args.token}`,
        }),
      }),
      signUp: builder.mutation<SIgnUpResponse, SignUpArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'POST',
          params: args,
          url: `v1/auth/sign-up`,
        }),
      }),
      updateCard: builder.mutation<UpdateCardResponse, UpdateCardArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'PATCH',
          params: args,
          url: `v1/cards/${args.id}`,
        }),
      }),
      updateMe: builder.mutation<UpdateMeResponse, UpdateMeArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'PATCH',
          params: args,
          url: `v1/auth/me`,
        }),
      }),
      verifyEmail: builder.mutation<void, VerifyEmailArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'POST',
          params: args,
          url: `v1/auth/verify-email`,
        }),
      }),
    }
  },
})
