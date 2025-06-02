import { FetchError } from 'ofetch'

export interface FetchCustomConfig {
    setToken?: boolean;
    ignoreErrors?: boolean;
    onError?: (e: FetchError) => void;
    onValidationFailed?: (erros: Record<string, string>, e: FetchError) => void;
    toastError?: boolean;
    setErrors?: (errors: { [key: string]: string }) => void;
    goToLogin?: boolean;
}