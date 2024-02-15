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
  UpdateMeArgs,
  UpdateMeResponse,
  VerifyEmailArgs,
} from '@/services'
import { baseApi } from '@/services/base-api'

export const AuthService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<LoginResponse, LoginArgs>({
        invalidatesTags: ['Me'],
        query: body => ({
          body,
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        query: () => ({
          method: 'POST',
          params: undefined,
          url: `v1/auth/logout`,
        }),
      }),
      me: builder.query<AuthMeResponse, void>({
        providesTags: ['Me'],
        query: () => ({
          params: undefined,
          url: `v1/auth/me`,
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
        query: body => ({
          body,
          method: 'POST',
          url: `v1/auth/sign-up`,
        }),
      }),
      updateMe: builder.mutation<UpdateMeResponse, UpdateMeArgs>({
        invalidatesTags: ['Me'],
        query: ({ avatar, name }) => {
          const bodyFormData = new FormData()

          name && bodyFormData.append('name', name)
          avatar && bodyFormData.append('avatar', avatar[0])

          return {
            body: { formData: bodyFormData },
            formData: true,
            headers: {
              'Content-Type': 'multipart/form-data;',
            },
            method: 'PATCH',
            url: 'v1/auth/me',
          }
        },
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
export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useSignUpMutation,
  useUpdateMeMutation,
} = AuthService
