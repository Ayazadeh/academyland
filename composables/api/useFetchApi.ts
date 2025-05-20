import type { FetchOptions } from 'ofetch'
import { plainToClass } from "class-transformer";
import type { ClassConstructor } from "class-transformer";

export const useFetchApi =<T extends ClassConstructor<unknown>>(classTransformer: T | null = null) => {
    const myCustomFetch = (url: string, config?: FetchOptions) => {
        config = { baseURL: 'https://acm.academyland.net/api/web', ...config }
        return $fetch(url, {
            ...config,
            method: config.method?.toUpperCase() as 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE'
        }).then((response) => {
            if (classTransformer != null) {
                return plainToClass(classTransformer, response, { 
                    excludeExtraneousValues: true 
                });
            }
            return response;
        })
    }
    return myCustomFetch
}