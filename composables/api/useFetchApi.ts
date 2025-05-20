import { plainToClass, instanceToPlain } from "class-transformer";
import type { FetchOptions } from 'ofetch'
import type { ClassConstructor } from "class-transformer";

export const useFetchApi =<T extends ClassConstructor<unknown>>(classTransformer: T | null = null) => {
    const myCustomFetch = async (url: string, config?: FetchOptions) => {
        config = { baseURL: 'https://acm.academyland.net/api/web', ...config }
        try {
            const response = await $fetch(url, {
                ...config,
                method: config.method?.toUpperCase() as 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE'
            })
        
            if (classTransformer != null) {
                const transformed = plainToClass(classTransformer, response, { 
                    excludeExtraneousValues: true 
                });
                return instanceToPlain(transformed);
            }

            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    return myCustomFetch
}