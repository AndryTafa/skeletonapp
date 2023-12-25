import { join } from 'path'
import type { Config } from 'tailwindcss'
import { skeleton } from '@skeletonlabs/tw-plugin'

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			// Optionally, customize Flowbite primary colors here
			colors: {
				primary: {
					50: '#FFF5F2',
					100: '#eefaff',
					200: '#def1ff',
					300: '#ccebff',
					400: '#adddff',
					500: '#5dc0fe',
					600: '#028792',
					700: '#27a0eb',
					800: '#2299cc',
					900: '#1b60a5'
				}
			}
		},
	},
	plugins: [
		skeleton({
			themes: {
				preset: [
					{
						name: 'wintry',
						enhancements: true,
					},
				],
			},
		}),
		require('flowbite/plugin'),
	],
} satisfies Config;
