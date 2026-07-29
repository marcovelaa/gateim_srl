/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#081121', // Darker navy matching the image
          light: '#0F1E38',
        },
        gold: {
          DEFAULT: '#FACC15', // Vibrant yellow matching the image
          light: '#FDE047',
        },
        gray: {
          light: '#F9FAFB',
          text: '#4B5563',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
