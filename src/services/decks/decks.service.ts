import {
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
  UpdateCardArgs,
  UpdateCardGradeArgs,
  UpdateCardResponse,
} from '@/services'
import { baseApi } from '@/services/base-api'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<CardResponse, CreateCardArgs>({
        invalidatesTags: [''],
        query: ({ id, ...body }) => ({
          body,
          method: 'POST',
          url: `v1/decks/${id}/cards`,
        }),
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: body => ({
          body,
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
        query: ({ id, ...params }) => ({
          params: params ?? undefined,
          url: `v1/decks/${id}/cards`,
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
      getMinMaxDeckCards: builder.query<GetMinMaxDeckCardsArgs, void>({
        providesTags: [''],
        query: () => ({
          params: undefined,
          url: `v2/decks/min-max-cards`,
        }),
      }),
      getRandomCard: builder.query<GetRandomCardResponse, GetRandomCardArgs>({
        providesTags: [''],
        query: ({ id, ...args }) => ({
          params: args,
          url: `v1/decks/${id}/learn`,
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
      updateCardGrade: builder.mutation<GetRandomCardResponse, UpdateCardGradeArgs>({
        invalidatesTags: [''],
        query: body => ({
          body,
          method: 'POST',
          url: `/v1/decks/${body.cardId}/learn`,
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
    }
  },
})
export const {
  useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetCardsInADeckQuery,
  useGetDeckQuery,
  useGetDecksQuery,
  useGetMinMaxDeckCardsQuery,
  useGetRandomCardQuery,
  useUpdateCardGradeMutation,
} = DecksService
