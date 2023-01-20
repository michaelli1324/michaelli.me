import { z } from 'zod';

const envVariables = z.object({
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string(),
  SPOTIFY_REFRESH_TOKEN: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
