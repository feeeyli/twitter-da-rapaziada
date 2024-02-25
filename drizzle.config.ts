import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/lib/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DB_URL!,
  },
  verbose: true,
  strict: true,
});
