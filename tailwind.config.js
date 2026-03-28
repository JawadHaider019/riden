/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                audiowide: ["Audiowide", "sans-serif"],
                dmsans: ["DM Sans", "sans-serif"],
            },
            keyframes: {
                slideDownFadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-100%)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.8)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(100%)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                widthExpand: {
                    '0%': { width: '0%', left: '50%' },
                    '100%': { width: '100%', left: '0%' }
                },
                dropdownExpand: {
                    '0%': { height: '0', opacity: '0' },
                    '100%': { height: '60vh', opacity: '1' }
                }
            },
            animation: {
                'slide-down-fade': 'slideDownFadeIn 0.6s ease-out',
                'fade-up': 'fadeInUp 0.5s ease-out',
                'fade-left': 'fadeInLeft 0.4s ease-out',
                'fade-right': 'fadeInRight 0.4s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
                'slide-left': 'slideInLeft 0.4s ease-out',
                'slide-right': 'slideInRight 0.4s ease-out',
                'width-expand': 'widthExpand 0.5s ease-out',
                'dropdown-expand': 'dropdownExpand 0.4s ease-out'
            }

        },
    },
    plugins: [],
}