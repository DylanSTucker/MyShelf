declare global{
    namespace NodeJS{
        export interface ProcessEnv{
            VITE_GOOGLE_BOOKS_API_KEY: string;
            
            VITE_POSTGRES_USERNAME: string;
            VITE_POSTGRES_PASSWORD: string;
            VITE_HOST: string;
            VITE_DB_PORT: string;
        }
    }
}
export {};