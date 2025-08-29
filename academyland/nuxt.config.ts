// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
import { PROXY_CONFIG } from './composables/api/api.config';

export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	vite: {
		plugins: [tailwindcss()],
	},
	nitro: {
		devProxy: PROXY_CONFIG,
	},
	typescript: {
		typeCheck: true,
	},
	modules: ['@pinia/nuxt'],
	extends: [
		'../nuxt-layer'
	]
});
