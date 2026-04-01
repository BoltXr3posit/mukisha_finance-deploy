/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
 theme: {
    extend: {
        
        colors: {
        // Now you can just type 'bg-brand' or 'text-brand' anywhere in your app!
        brand: '#60CF38', 
      },

      fontFamily: {
        // 'sans' is your default body font
        sans: ['var(--font-inter)'], 
        // 'heading' is a custom class you can use on your <h1> tags
        heading: ['var(--font-jakarta)'], 
      },
    },
  },
  plugins: [],
}
