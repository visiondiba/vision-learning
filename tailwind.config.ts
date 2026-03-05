// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        // This makes 'font-sans' use Founders Grotesk by default
        sans: ["var(--font-space)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-space-mono)"]
      },
    },
  },
  // ...
};
export default config;