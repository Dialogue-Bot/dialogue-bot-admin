export enum ELang {
  EN = 'en',
  VI = 'vi',
}

export type TBaseResponse<T> = {
  data: T
  message: string
}

export type TToken = {
  accessToken: string
  refreshToken: string
}

export type Breadcrumb = {
  title: string
  path: string
}

export type TResPagination<T = unknown> = TBaseResponse<{
  items: T[]
  totalItems: number
}>

export type TBaseQuery = Partial<{
  page: number
  limit: number
  orderBy: string
  sortType: 'asc' | 'desc'
  q: string
}>

export type TSelectResponse<L = string, V = unknown> = {
  label: L
  value: V
  isSelected: boolean
}
