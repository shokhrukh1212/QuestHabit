/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0D0D1A",
          card: "#1A1A2E",
          elevated: "#252542",
        },
        accent: {
          purple: "#6C5CE7",
          gold: "#F4A261",
          green: "#2ECC71",
          red: "#E74C3C",
          blue: "#3498DB",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B0C0",
          muted: "#7F8C8D",
        },
        rarity: {
          common: "#9E9E9E",
          uncommon: "#2ECC71",
          rare: "#3498DB",
          epic: "#6C5CE7",
          legendary: "#F4A261",
        },
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      fontSize: {
        xs: "10px",
        sm: "12px",
        md: "14px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        title: "32px",
      },
    },
  },
  plugins: [],
};
