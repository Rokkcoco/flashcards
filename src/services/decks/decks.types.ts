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
  cover?: FileList
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
export type UpdateDeckArgs = {
  cover: FileList
  id: string
  isPrivate: boolean
  name: string
}
export type UpdateDeckResponse = {
  author: UpdateDeckResponseAuthor
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}
export type UpdateDeckResponseAuthor = {
  id: string
  name: string
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
  cover: FileList
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
  items: CardResponse[]
  pagination: Pagination
}

export type GetCardsInADeckArgs = {
  answer?: string
  currentPage?: string
  id: string
  itemsPerPage?: string
  orderBy?: string
  question?: string
}

export type CreateCardArgs = {
  answer: string
  answerImg?: FileList
  answerVideo?: string
  id: string
  question: string
  questionImg?: FileList
  questionVideo?: string
}
export type GetRandomCardArgs = {
  id: string
  previousCardId?: string
}
export type UpdateCardGradeArgs = {
  cardId: string
  grade: number
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
