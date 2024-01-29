import { baseApi } from '@/services'

import {
  AuthMeResponse,
  CardResponse,
  CreateCardArgs,
  CreateDeckArgs,
  Deck,
  DeckResponse,
  DeleteDeckArgs,
  GetCardArgs,
  GetCardsInADeckArgs,
  GetCardsInADeckResponse,
  GetDeckArgs,
  GetDecksArgs,
  GetMinMaxDeckCardsArgs,
  GetRandomCardArgs,
  GetRandomCardResponse,
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
} from '.'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<CardResponse, CreateCardArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'POST',
          params: args,
          url: `v1/decks/${args.id}/cards`,
        }),
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteCard: builder.mutation<void, DeleteDeckArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'DELETE',
          params: args,
          url: `v1/cards/${args.id}`,
        }),
      }),
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          method: 'DELETE',
          url: `v1/decks/${args.id}`,
        }),
      }),
      /*maybe not Decks for getCard*/
      getCard: builder.query<CardResponse, GetCardArgs>({
        providesTags: ['Card'],
        query: args => ({
          params: args,
          url: `v1/cards/${args.id}`,
        }),
      }),
      getCardsInADeck: builder.query<GetCardsInADeckResponse, GetCardsInADeckArgs>({
        providesTags: [''],
        query: args => ({
          params: args,
          url: `v1/decks/${args.id}/cards`,
        }),
      }),
      getDeck: builder.query<GetDeckArgs, GetCardArgs>({
        providesTags: ['Deck'],
        query: args => ({
          params: args ?? undefined,
          url: `v1/decks/${args.id}`,
        }),
      }),
      getDecks: builder.query<DeckResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
      getMe: builder.query<AuthMeResponse, void>({
        providesTags: [''],
        query: () => ({
          params: undefined,
          url: `v1/auth/me`,
        }),
      }),
      getMinMaxDeckCards: builder.query<GetMinMaxDeckCardsArgs, void>({
        providesTags: [''],
        query: () => ({
          params: undefined,
          url: `v2/decks/min-max-cards`,
        }),
      }),
      getRandomCard: builder.query<GetRandomCardResponse, GetRandomCardArgs>({
        providesTags: [''],
        query: args => ({
          params: args,
          url: `v1/decks/${args.id}/learn`,
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
      updateDeck: builder.mutation<GetDeckArgs, GetCardArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'PATCH',
          params: args,
          url: `v1/decks/${args.id}`,
        }),
      }),
      updateMe: builder.mutation<UpdateMeResponse, UpdateMeArgs>({
        invalidatesTags: [''],
        query: args => ({
          method: 'POST',
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
export const { useCreateDeckMutation, useDeleteDeckMutation, useGetDeckQuery, useGetDecksQuery } =
  DecksService
