import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

export default defineConfig(config, {
  use: { baseURL: "http://localhost:3100" },
  webServer: {
    command: "node node_modules/next/dist/bin/next start --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: false,
    timeout: 120000,
    // Do not send email during production smoke tests, even if local credentials exist.
    env: { RESEND_API_KEY: "", CONTACT_FROM: "", CONTACT_TO: "" },
  },
});
