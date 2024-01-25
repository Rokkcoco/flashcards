import { baseApi } from '@/services'

import {
  CardResponse,
  CreateDeckArgs,
  Deck,
  DeckResponse,
  DeleteDeckArgs,
  GetCardArgs,
  GetDecksArgs,
} from '.'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: 'v1/decks',
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
        query: args => ({
          params: args,
          url: `v1/cards/${args.id}`,
        }),
      }),
      getDecks: builder.query<DeckResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
    }
  },
})
export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useLazyGetCardQuery,
} = DecksService
