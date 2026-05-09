import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // If your app folder is at the root like in your screenshot, include these too just in case:
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F9FA",
        foreground: "#1A1A1A",
        bin: {
          nonbio: "#1E293B",
          recyclable: "#F5A623",
          ewaste: "#EF4444",
          bio: "#10B981",
        },
      },
      fontFamily: {
        // We will link these to the Next.js variables in your layout.tsx
        heading: ['var(--font-clash)', 'sans-serif'],
        body: ['var(--font-archivo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;