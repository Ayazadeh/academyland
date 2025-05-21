import { plainToInstance, instanceToPlain } from "class-transformer";
import type { FetchOptions } from 'ofetch'
import type { ClassConstructor } from "class-transformer";

type HttpMethod = 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE';

export const useFetchApi = <T, R>(classTransformer?: ClassConstructor<T>) => {
    const myCustomFetch = async (url: string, config?: FetchOptions) => {
        config = { baseURL: 'https://acm.academyland.net/api/web', ...config }
        
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
            console.error('Error fetching data:', error);
            if (error instanceof Error) {
                throw new Error(`API request failed: ${error.message}`);
            }
            throw error;
        }
    }
    return myCustomFetch
}

function isValidHttpMethod(method: string): method is HttpMethod {
    const validMethods: HttpMethod[] = ['GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE'];
    return validMethods.includes(method.toUpperCase() as HttpMethod);
}