import { PaginatedResponse } from '@/services'

export type DeckResponse = PaginatedResponse<Deck[]>

export type Deck = {
  author: DeckAuthor
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type DeckAuthor = {
  id: string
  name: string
}

export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: null | string
}

export type CreateDeckArgs = {
  cover?: File | null
  isPrivate?: boolean
  name: string
}

export type DeleteDeckArgs = {
  id: string
}
//todo fix types
export type GetCardArgs = {
  id: string
}
export type CardResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}
export type GetDeckArgs = {
  author: DeckAuthor
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type GetMinMaxDeckCardsArgs = {
  max: number
  min: number
}
export type GetCardsInADeckResponse = {
  items: GetCardsInADeckResponseItems[]
  pagination: GetCardsInADeckResponsePagination
}
export type GetCardsInADeckResponsePagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}
export type GetCardsInADeckResponseItems = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type GetCardsInADeckArgs = {
  answer?: string
  currentPage?: string
  id: string
  itemsPerPage?: string
  orderBy?: string
  question?: string
}

export type CreateCardResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}
export type CreateCardArgs = {
  answer: string
  answerImg: string
  answerVideo?: string
  id: string
  question: string
  questionImg?: string
  questionVideo?: string
}
export type GetRandomCardArgs = {
  id: string
  previousCardId?: string
}
export type GetRandomCardResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type UpdateCardArgs = {
  answer?: string
  answerImg?: string
  answerVideo?: string
  id: string
  question?: string
  questionImg?: string
  questionVideo?: string
}
export type UpdateCardResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}
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
  avatar: string
  name: string
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
  login: string
  password: string
  rememberMe: boolean
}
export type LoginResponse = {
  accessToken: string
}
export type SignUpArgs = {
  email: string
  html: string
  name: string
  password: string
  sendConfirmationEmail: boolean
  subject: string
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
