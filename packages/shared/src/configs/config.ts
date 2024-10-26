import { join } from "path";
import type { ConfigModuleOptions } from "@nestjs/config";

export const DefaultConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  expandVariables: true,
  envFilePath: [
    join(process.cwd(), ".env"),
    join(process.cwd(), ".env.local"),
    join(process.cwd(), `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`)
  ]
} satisfies ConfigModuleOptions;