<script lang="ts">
	import type{ Country } from '$lib/types';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';



	let countries: Country[] = [];
	const toastStore = getToastStore();
	$: console.log(countries);

	async function getCountries() {
		const res = await fetch('/countries');
		const data = await res.json();
		countries = [...data.countries];
		console.log(countries);
		return countries
	}

	function handleEdit(country: Country) {
		console.log('edit clicked for country: ', country);
	}

	async function deleteCountry(country: Country) {
		console.log('delete clicked for country: ', country);

		// Optimistically update the UI
		countries = countries.filter(c => c.id !== country.id);

		try {
			const response = await fetch('/countries/' + country.id, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Deletion failed');
			}

			showToast('Country deleted successfully');
			// No need to call getCountries if deletion is successful
		} catch (error) {
			// If deletion fails, revert UI and show error message
			await getCountries();
			showToast('Error deleting country', 3000);
			console.error('Error:', error);
		}
	}

	async function createCountry() {
		// Temporary new country object with placeholder values
		const tempNewCountry = {
			id: -1, // Temporary ID
			name: 'New Country',
			created_at: new Date().toISOString(),
			edited_at: new Date().toISOString()
		};

		// Optimistically add the new country to the UI
		countries = [...countries, tempNewCountry];

		try {
			const response = await fetch('/countries', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
				// No need to send body data as the name is hardcoded in the backend
			});

			if (!response.ok) {
				throw new Error('Failed to create country');
			}

			const responseData = await response.json();
			showToast(responseData.message);

			// Update countries with actual data from backend
			const actualNewCountry = await getCountries();
			countries = countries.map(country =>
				country.id === tempNewCountry.id ? actualNewCountry.find(c => c.name === 'New Country') : country
			);
		} catch (error) {
			// If the request fails, remove the temporary country
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

	const formatDate = (dateString: string): string => {
		return dateString.split('T')[0];
	};

	onMount(async () => {
		await getCountries();
	});
</script>

<div class="table-block">
	<div class="table-container">
		<table class="table">
			<thead>
			<tr>
				<th scope="col" id="headerId">ID</th>
				<th scope="col" id="headerName">Name</th>
				<th scope="col" id="headerCreatedAt">Created At</th>
				<th scope="col" id="headerOptions"></th>
			</tr>
			</thead>
			<tbody>
			{#each countries as country (country.id)}
				<tr>
					<td headers="headerId">{country.id}</td>
					<td headers="headerName">{country.name}</td>
					<td headers="headerCreatedAt">{formatDate(country.created_at)}</td>
					<td headers="headerOptions">
						<span class="options-span" style="color: #a3fff1" id={"trigger-" + country.id}>Options</span>
						<Dropdown triggeredBy={"#trigger-" + country.id}>
							<DropdownItem on:click={() => handleEdit(country)}>Edit</DropdownItem>
							<DropdownItem on:click={() => deleteCountry(country)}>Delete</DropdownItem>
						</Dropdown>
					</td>
				</tr>
			{/each}
			</tbody>
		</table>
		<div class="button-block">
			<div class="spacer"></div>
			<button type="button" class="btn variant-filled-primary btn-sm create-button" on:click={createCountry}>Create</button>
		</div>
	</div>
</div>


<style>

	.table-container {

		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		width: 70%;
		margin: 0 auto;
	}

	.table-block {
		width: 100%;
	}

	.button-block {
		display: flex;
		justify-content: flex-end;
	}

	.btn {
		margin-top: 20px;
	}

	.options-span {
		cursor: pointer;
	}

	.create-button {
		margin-right: 5px;
	}

</style>