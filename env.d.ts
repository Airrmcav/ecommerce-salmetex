/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BACKEND_URL: string;
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  }
}