import useSWR, { Key } from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration, MutationFetcher } from 'swr/mutation'
import { getParamsUrl } from '@/utils/url'
import api from './api'
import { useAuth } from './auth/hooks'
import type { InfiniteParams } from './types'

const defaultSWRConfiguration: SWRConfiguration = {
  revalidateOnFocus: false,
  errorRetryCount: 0,
  keepPreviousData: true,
  dedupingInterval: 1000 * 60 // 1 minute
  // revalidateIfStale: false
}

const fetcher = (url: string) =>
  api.get(url).then((res: { data: { error: any } }) => {
    if (res.data.error) {
      throw res.data.error
    }
    return res.data
  })

export const useFetcher = <T, U extends Key = Key>(
  url: string | null,
  params?: U,
  options: SWRConfiguration = {}
) => {
  const paramsUrl = url ? `${url}${getParamsUrl(params)}` : null
  const { data, isLoading, isValidating, error, mutate } = useSWR<T, CustomError>(
    paramsUrl,
    fetcher,
    {
      ...defaultSWRConfiguration,
      ...options
    }
  )
  return { data, isLoading, isValidating, error, mutate }
}

// used for the api need auth token
export const useAuthFetcher = <T, U extends Key = Key>(
  url: string | null,
  params?: U,
  options: SWRConfiguration = {}
) => {
  const { isLogin } = useAuth()
  const conditionUrl = isLogin ? url : null
  const { data, isLoading, isValidating, error, mutate } = useFetcher<T, U>(
    conditionUrl,
    params,
    options
  )
  return { data, isLoading, isValidating, error, mutate }
}

export const useFetcherMutation = <T, U extends Key = Key>(
  url: string | null | undefined,
  fetcher?: MutationFetcher<T, U, Key>,
  options: SWRMutationConfiguration<T, CustomError, U, Key> = {}
) => {
  const conditionUrl = url ? url : null
  const defaultFetcher = (url: string, { arg }: { arg: U }) => {
    const paramsUrl = `${url}${getParamsUrl(arg)}`
    return api.get(paramsUrl).then((res: { data: any }) => res.data)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isMutating, error, trigger, reset } = useSWRMutation<T, CustomError, Key, any>(
    conditionUrl,
    fetcher || defaultFetcher,
    {
      revalidate: false,
      ...options
    }
  )
  return { data, isMutating, error, trigger, reset }
}

export const useAuthFetcherMutation = <T, U extends Key = Key>(
  url: string | null | undefined,
  fetcher?: MutationFetcher<T, U, Key>,
  options: SWRMutationConfiguration<T, CustomError, U, Key> = {}
) => {
  const { isLogin } = useAuth()
  const conditionUrl = isLogin ? url : null
  const { data, isMutating, error, trigger, reset } = useFetcherMutation<T, U>(
    conditionUrl,
    fetcher,
    options
  )
  return { data, isMutating, error, trigger, reset }
}

export const usePoster = <T>(
  url: string | null,
  payload?: object,
  options: SWRConfiguration = {}
) => {
  const poster = (url: string) => api.post(url, payload).then((res: { data: any }) => res.data)
  const { data, isLoading, isValidating, error, mutate } = useSWR<T>(url, poster, {
    ...defaultSWRConfiguration,
    ...options
  })
  return { data, isLoading, isValidating, error, mutate }
}

export const useAuthPoster = <T>(
  url: string | null,
  payload?: object,
  options: SWRConfiguration = {}
) => {
  const { isLogin } = useAuth()
  const conditionUrl = isLogin ? url : null
  const poster = (url: string) => api.post(url, payload).then((res: { data: T }) => res.data as T)
  const { data, isLoading, isValidating, error, mutate } = useSWR<T>(conditionUrl, poster, {
    ...defaultSWRConfiguration,
    ...options
  })
  return { data, isLoading, isValidating, error, mutate }
}

export const usePostMutation = <T, U extends Key = Key>(
  url: Key | null | undefined,
  poster?: (url: string, { arg }: { arg: U }) => Promise<T>,
  options: SWRMutationConfiguration<T, CustomError> = {}
) => {
  const conditionUrl = url ? url : null
  const defaultPoster = (url: string, { arg }: { arg: U }) =>
    api.post(url, arg).then((res: { data: T }) => res.data as T)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isMutating, error, trigger, reset } = useSWRMutation<T, CustomError, Key, any>(
    conditionUrl,
    poster || defaultPoster,
    {
      revalidate: false,
      ...options
    }
  )
  return { data, isMutating, error, trigger, reset }
}

export const useAuthPostMutation = <T, U extends Key = Key>(
  url: Key | null | undefined,
  poster?: (url: string, { arg }: { arg: U }) => Promise<T>,
  options: SWRMutationConfiguration<T, CustomError, U, Key> = {}
) => {
  const { isLogin } = useAuth()
  const conditionUrl = isLogin ? url : null
  const { data, isMutating, error, trigger, reset } = usePostMutation<T, U>(
    conditionUrl,
    poster,
    options
  )
  return { data, isMutating, error, trigger, reset }
}

export const useMultipleGetRequest = <T>(urls: string[] | null, options: SWRConfiguration = {}) => {
  const fetcher = (urls: string[]) => {
    return Promise.all(urls.map((url) => api.get(url).then((res: { data: any }) => res.data)))
  }
  const { data, isLoading, isValidating, error, mutate } = useSWR<T[]>(urls, fetcher, {
    ...defaultSWRConfiguration,
    ...options
  })
  return { data, isLoading, isValidating, error, mutate }
}

export const useMutiGetRequest = <T>(urls: string[] | null, options: SWRConfiguration = {}) => {
  const { data, isLoading, isValidating, error, mutate } = useMultipleGetRequest<T>(urls, options)
  return { data, isLoading, isValidating, error, mutate }
}

// pageName 用來識別哪個是傳到後端的currentPage參數，用以更新getKey中的參數
export const useAuthInfinite = <T, U extends object>({ url, ...props }: InfiniteParams<T, U>) => {
  const { isLogin } = useAuth()

  const conditionUrl = isLogin ? url : null

  const { data, mutate, size, setSize, isValidating, isLoading } = useInfinite<T, U>({
    url: conditionUrl,
    ...props
  })

  return { data, mutate, size, setSize, isValidating, isLoading }
}

// pageName 用來識別哪個是傳到後端的currentPage參數，用以更新getKey中的參數
export const useInfinite = <T, U extends object>({
  url,
  params,
  pageName,
  options = {},
  fetcher
}: InfiniteParams<T, U>) => {
  const defaultFetcher = (url: string) =>
    api.get(url).then((res: { data: { error: any } }) => {
      if (res.data.error) {
        throw res.data.error
      }
      return res.data
    })

  const getKey = (pageIndex: number) => {
    const result = `${url}${getParamsUrl({ ...params, [pageName]: pageIndex + 1 })}`
    return result // init pageIndex is 0
  }

  const { data, mutate, size, setSize, isValidating, isLoading } = useSWRInfinite<T>(
    getKey,
    fetcher || defaultFetcher,
    { ...defaultSWRConfiguration, revalidateFirstPage: false, ...options }
    // revalidateFirstPage: false 每次onload都不強制更新第一頁
  )

  return { data, mutate, size, setSize, isValidating, isLoading }
}

export const usePostInfinite = <T, U extends object>({
  url,
  params,
  pageName,
  options = {},
  fetcher,
  disabled = false
}: InfiniteParams<T, U>) => {
  const defaultFetcher = (url: string) => {
    // url 是從下方 getKey所獲得
    const matchNumberStr = url.match(new RegExp(`${pageName}=(\\d+)`))
    const pageNumber = matchNumberStr ? matchNumberStr[1] : undefined
    return api.post(url, { ...params, [pageName]: pageNumber }).then((res: { data: { error: any } }) => {
      if (res.data.error) {
        throw res.data.error
      }
      return res.data
    })
  }

  const getKey = (pageIndex: number) => {
    // pageIndex為上一次的index，將pageIndex + 1 為即將要發送的 pageNumber
    const result = disabled
      ? null
      : `${url}${getParamsUrl({ ...params, [pageName]: pageIndex + 1 })}`
    return result // init pageIndex is 0
  }
  const { data, mutate, size, setSize, isValidating, isLoading } = useSWRInfinite<T>(
    getKey,
    fetcher || defaultFetcher,
    { ...defaultSWRConfiguration, revalidateFirstPage: false, ...options }
    // revalidateFirstPage: false 每次onload都不強制更新第一頁
  )
  return { data, mutate, size, setSize, isValidating, isLoading }
}
