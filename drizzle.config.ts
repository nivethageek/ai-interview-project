import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.ts",
  dbCredentials:{
   url : "postgresql://neondb_owner:npg_dy0b6JXkfEBR@ep-solitary-resonance-ax84xvdc.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require"
  }
});
