import type { FetchOptions } from 'ofetch'

export const useFetchApi = () => {
    const myCustomFetch = (url: string, config?: FetchOptions) => {
        config = { baseURL: 'https://acm.academyland.net/api/web', ...config }
        return $fetch(url, {
            ...config,
            method: config.method?.toUpperCase() as 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE'
        })
    }
    return myCustomFetch
}