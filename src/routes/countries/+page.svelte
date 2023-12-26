<script lang="ts">
	import type { CountryModel, CreateCountryModel, UpdateCountryModel } from '$lib/types';
	import { onMount } from 'svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import CountriesTable from '$lib/customComponents/CountriesTable.svelte';
	import CreateCountryModal from '$lib/customComponents/CreateOrEditCountryModal.svelte';
	import { fade } from 'svelte/transition';

	let countries: CountryModel[] = [];
	const toastStore = getToastStore();

	let createFormModal = false;
	let editFormModal = false;

	let selectedCountry: CountryModel | null = null;


	async function getCountries() {
		const res = await fetch('/countries');
		const data = await res.json();
		countries = [...data.countries];
		return countries.sort((a, b) => a.id - b.id);
	}

	function handleEdit(country: CountryModel) {
		selectedCountry = country;
		console.log('selected country on handleEdit is ' + selectedCountry);
		editFormModal = true;
	}

	async function deleteCountry(country: CountryModel) {
		// Keeping a copy of the original countries list
		const previousCountriesState = [...countries];

		// Optimistic update: remove the country from the list
		countries = countries.filter(c => c.id !== country.id);

		try {
			const response = await fetch('/countries/' + country.id, { method: 'DELETE' });

			if (!response.ok) {
				throw new Error('Deletion failed');
			}

			showToast('Country deleted successfully');
		} catch (error) {
			// Revert to the original list if deletion fails
			countries = previousCountriesState;
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

	async function updateCountryHandler() {
		if (!selectedCountry) {
			console.error('No country selected for updating');
			return;
		}

		const updatedCountry: UpdateCountryModel = {
			name: selectedCountry.name
		};

		try {
			const response = await fetch('/countries/' + selectedCountry.id, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedCountry)
			});

			if (!response.ok) {
				throw new Error('Failed to update country');
			}

			const responseData = await response.json();
			showToast(responseData.message);

			await getCountries();
		} catch (error) {
			showToast('Error updating country', 3000, 'bg-red-500');
			console.error('Error:', error);
		}
	}

	onMount(async () => {
		await getCountries();
	});
	// empty country
</script>

<main in:fade={{delay: 200}}>
	<CountriesTable {countries} onEdit={handleEdit} onDelete={deleteCountry} onCreate={() => { createFormModal = true }} />
	<CreateCountryModal bind:open={createFormModal} on:create={createCountryHandler} />
	<CreateCountryModal bind:open={editFormModal} on:create={() => updateCountryHandler()} />
</main>

