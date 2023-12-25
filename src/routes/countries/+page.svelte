<script lang="ts">
	import type { Country } from '$lib/types';
	import { onMount } from 'svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import CountriesTable from '$lib/customComponents/CountriesTable.svelte';

	let countries: Country[] = [];
	const toastStore = getToastStore();

	async function getCountries() {
		const res = await fetch('/countries');
		const data = await res.json();
		countries = [...data.countries];
		return countries;
	}

	function handleEdit(country: Country) {
		console.log('edit clicked for country: ', country);
		// Implement your edit logic here
	}

	async function deleteCountry(country: Country) {
		countries = countries.filter(c => c.id !== country.id);

		try {
			const response = await fetch('/countries/' + country.id, { method: 'DELETE' });

			if (!response.ok) {
				throw new Error('Deletion failed');
			}

			showToast('Country deleted successfully');
		} catch (error) {
			await getCountries();
			showToast('Error deleting country', 3000);
			console.error('Error:', error);
		}
	}

	async function createCountry() {
		const tempNewCountry = {
			id: -1,
			name: 'New Country',
			created_at: new Date().toISOString(),
			edited_at: new Date().toISOString()
		};

		countries = [...countries, tempNewCountry];

		try {
			const response = await fetch('/countries', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			});

			if (!response.ok) {
				throw new Error('Failed to create country');
			}

			const responseData = await response.json();
			showToast(responseData.message);

			const actualNewCountry = await getCountries();
			countries = countries.map(country =>
				country.id === tempNewCountry.id ? actualNewCountry.find(c => c.name === 'New Country') : country
			).filter((country): country is Country => !!country);
		} catch (error) {
			countries = countries.filter(country => country.id !== tempNewCountry.id);
			showToast('Error creating country', 3000);
			console.error('Error:', error);
		}
	}

	function showToast(msg: string, duration: number = 3000) {
		const t: ToastSettings = {
			message: msg,
			hideDismiss: true,
			timeout: duration
		};
		toastStore.trigger(t);
	}

	onMount(async () => {
		await getCountries();
	});
</script>

<CountriesTable {countries} onEdit={handleEdit} onDelete={deleteCountry} onCreate={createCountry} />
