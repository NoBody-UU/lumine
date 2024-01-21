declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			DATABASE_URL: string;
		}
	}
}

export {};
