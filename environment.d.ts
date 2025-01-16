declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            NEXT_PUBLIC_BACKEND_URL: string;
            FRONTEND_URL: string;
            JWT_SECRET: string
        }
    }
}

export { };