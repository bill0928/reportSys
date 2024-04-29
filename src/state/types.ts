import type { SWRConfiguration, Key } from 'swr'
import type { MutationFetcher } from 'swr/mutation'

// export type ResponseData = {
//   code: number
//   error_description?: string
//   data: any
// }
export type ResponseData = {
  data: any
}
export type NormalResponse = {
  data: {
    total: number
    items: []
  }
}

export type TokenExpiredError = {
  error: {
    code: string
    message: string
    detail: string
  }
}

export type ErrorResponse = ResponseData | TokenExpiredError

type Filter = string | null | undefined

export type Filters = Record<string, Filter>

export type Pagination = {
  current: number
  pageSize: number
}

export type PostFormDataParams<Params> = {
  url: string
  params: Params
}

export type InfiniteParams<T, U extends object> = {
  url: string | null
  params: U
  pageName: string
  options?: SWRConfiguration
  fetcher?: MutationFetcher<T, U, Key>
  disabled?: boolean
}
export type PaginationParams ={
  page: number
  page_size?: number
}

