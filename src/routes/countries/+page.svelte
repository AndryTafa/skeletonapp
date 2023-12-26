<script lang="ts">
	import type { CountryModel, CreateCountryModel } from '$lib/types';
	import { onMount } from 'svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import CountriesTable from '$lib/customComponents/CountriesTable.svelte';
	import { Button, Input, Label, Modal } from 'flowbite-svelte';
	import CreateCountryModal from '$lib/customComponents/CreateCountryModal.svelte';

	let countries: CountryModel[] = [];
	const toastStore = getToastStore();

	let createFormModal = false;
	let newCountryName = '';


	async function getCountries() {
		const res = await fetch('/countries');
		const data = await res.json();
		countries = [...data.countries];
		return countries;
	}

	function handleEdit(country: CountryModel) {
		console.log('edit clicked for country: ', country);
		// Implement your edit logic here
	}

	async function deleteCountry(country: CountryModel) {
		const previousCountries = [...countries];
		countries = countries.filter(c => c.id !== country.id);

		try {
			const response = await fetch('/countries/' + country.id, { method: 'DELETE' });

			if (!response.ok) {
				throw new Error('Deletion failed');
			}

			showToast('Country deleted successfully');
		} catch (error) {
			countries = previousCountries; // Revert to the previous list of countries
			showToast('Error deleting country', 3000, 'bg-red-500');
			console.error('Error:', error);
		}
	}

	function createCountryHandler(event: CustomEvent) {
		const { newCountryName } = event.detail;
		createCountry(newCountryName);
	}

	async function createCountry(countryName: string) {
		const newCountry: CreateCountryModel = {
			name: countryName
		};

		try {
			const response = await fetch('/countries', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newCountry)
			});

			if (!response.ok) {
				throw new Error('Failed to create country');
			}

			const responseData = await response.json();
			showToast(responseData.message);

			await getCountries();
		} catch (error) {
			showToast('Error creating country', 3000, 'bg-red-500');
			console.error('Error:', error);
		}
	}

	function showToast(msg: string, duration: number = 3000, background: string = '') {
		if (background === '') {
			const t: ToastSettings = {
				message: msg,
				hideDismiss: true,
				timeout: duration,
			};
			toastStore.trigger(t);
		} else {
			const t: ToastSettings = {
				message: msg,
				hideDismiss: true,
				timeout: duration,
				background: background,
			};
			toastStore.trigger(t);
		}
	}

	onMount(async () => {
		await getCountries();
	});
</script>

<CountriesTable {countries} onEdit={handleEdit} onDelete={deleteCountry} onCreate={() => { createFormModal = true }} />
<CreateCountryModal bind:open={createFormModal} on:create={createCountryHandler} />

