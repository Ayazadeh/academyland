import { BASE_URL } from './api.config';
import { plainToInstance, instanceToPlain, type ClassConstructor } from "class-transformer";
import type { FetchOptions, FetchError } from 'ofetch'
import type { FetchCustomConfig } from './FetchCustomConfig.interface';

type HttpMethod = 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE';

export const useFetchApi = <T, R>(classTransformer?: ClassConstructor<T>) => {
    const myCustomFetch = async (url: string, config?: FetchOptions, customConfig: FetchCustomConfig = {}) => {
        config = { baseURL: BASE_URL, ...config }
        
        if (config.method && !isValidHttpMethod(config.method)) {
            throw new Error(`Invalid HTTP method: ${config.method}`);
        }

        try {
            const response = await $fetch<R>(url, {
                ...config,
                method: config.method?.toUpperCase() as HttpMethod
            })
        
            if (classTransformer) {
                const transformed = plainToInstance(classTransformer, response, { 
                    excludeExtraneousValues: true 
                });
                return instanceToPlain(transformed) as unknown as R;
            }

            return response;
        } catch (error) {
            customConfig.onError?.(error as FetchError)

            if (customConfig.ignoreErrors) {
                return;
            }
        }
    }
    return myCustomFetch
}

function isValidHttpMethod(method: string): method is HttpMethod {
    const validMethods: HttpMethod[] = ['GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE'];
    return validMethods.includes(method.toUpperCase() as HttpMethod);
}