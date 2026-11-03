// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    site: 'https://tommcevoy.com',
    integrations: [mdx(), sitemap(), svelte()],
    fonts: [
        {
            provider: fontProviders.local(),
            name: 'Futura',
            cssVariable: '--font-futura',
            options: {
                variants: [
                    {
                    src: ['./src/assets/fonts/futura-standard.ttf'],
                    weight: 400,
                    style: 'normal',
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: 'Futura Book',
            cssVariable: '--font-futura-book',
            options: {
                variants: [
                    {
                    src: ['./src/assets/fonts/futura-book.woff2'],
                    weight: 400,
                    style: 'normal',
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: 'Futura Light',
            cssVariable: '--font-futura-light',
            options: {
                variants: [
                    {
                    src: ['./src/assets/fonts/futura-light.woff2'],
                    weight: 300,
                    style: 'normal',
                    },
                ],
            },
        },
    ],
});