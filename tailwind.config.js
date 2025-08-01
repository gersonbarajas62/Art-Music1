module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--vsc-bg)",
        pane: "var(--vsc-paneBg)",
        sidebar: "var(--vsc-sideBarBg)",
        fg: "var(--vsc-foreground)",
        border: "var(--vsc-border)",
        button: {
          DEFAULT: "var(--vsc-buttonBg)",
          fg: "var(--vsc-buttonFg)",
          hover: "var(--vsc-buttonHoverBg)",
        },
      },
    },
  },
};
