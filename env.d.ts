declare namespace NodeJS {
  export interface ProcessEnv {
    HOST_NAME: string;
    PORT_DB: number;
    SECRET?: string;
    DB_NAME?: string;
    TOKEN_KEY?: string
  }
}