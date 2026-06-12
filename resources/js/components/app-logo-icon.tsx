import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 40 42"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            {/* Cercle d'équilibre */}
            <path
                d="M20 39C29.9411 39 38 30.9411 38 21C38 11.0589 29.9411 3 20 3C10.0589 3 2 11.0589 2 21C2 30.9411 10.0589 39 20 39Z"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.22"
            />

            {/* Pétale central */}
            <path
                d="M20 10.5C23.1 14.2 24.2 18 23.3 21.6C22.7 24 21.3 26 20 27.3C18.7 26 17.3 24 16.7 21.6C15.8 18 16.9 14.2 20 10.5Z"
                fill="currentColor"
            />

            {/* Pétale gauche */}
            <path
                d="M11.2 17.2C15.5 17.4 18.5 19.1 20 22.2C17.3 24.1 14.1 24.4 11.2 22.9C8.9 21.7 7.3 19.6 6.4 17.8C7.8 17.4 9.4 17.1 11.2 17.2Z"
                fill="currentColor"
                opacity="0.78"
            />

            {/* Pétale droit */}
            <path
                d="M28.8 17.2C24.5 17.4 21.5 19.1 20 22.2C22.7 24.1 25.9 24.4 28.8 22.9C31.1 21.7 32.7 19.6 33.6 17.8C32.2 17.4 30.6 17.1 28.8 17.2Z"
                fill="currentColor"
                opacity="0.78"
            />

            {/* Feuille basse gauche */}
            <path
                d="M9.2 26.6C13.1 25.1 16.9 25.6 20 28.4C16.9 31.2 13.1 31.7 9.2 30.2C6.9 29.3 5.2 27.9 4.2 26.9C5.6 26.5 7.4 26.1 9.2 26.6Z"
                fill="currentColor"
                opacity="0.55"
            />

            {/* Feuille basse droite */}
            <path
                d="M30.8 26.6C26.9 25.1 23.1 25.6 20 28.4C23.1 31.2 26.9 31.7 30.8 30.2C33.1 29.3 34.8 27.9 35.8 26.9C34.4 26.5 32.6 26.1 30.8 26.6Z"
                fill="currentColor"
                opacity="0.55"
            />

            {/* Base méditative */}
            <path
                d="M13.5 33.5H26.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
            />

            {/* Point énergie */}
            <path
                d="M20 7.2V5.2"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
        </svg>
    );
}
