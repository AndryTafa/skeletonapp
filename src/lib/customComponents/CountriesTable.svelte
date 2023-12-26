<script lang="ts">
	import type { CountryModel } from '$lib/types';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
	import { selectedCountry, setSelectedCountry } from '$lib/store';

	export let countries: CountryModel[] = [];
	export let onDelete: (country: CountryModel) => void;
	export let onCreate: () => void;
	export let onEdit: (country: CountryModel) => void;

	const formatDate = (dateString: string): string => dateString.split('T')[0];

</script>
<div class="table-block">
	<div class="table-container">
		<table class="table">
			<thead>
			<tr>
				<th scope="col" id="headerId">ID</th>
				<th scope="col" id="headerName">Name</th>
				<th scope="col" id="headerCreatedAt">Created At</th>
				<th scope="col" id="headerOptions" class="visually-hidden">Action</th>
			</tr>
			</thead>
			<tbody>
			{#each countries as country (country.id)}
				<tr transition:fade>
					<td headers="headerId">{country.id}</td>
					<td headers="headerName">{country.name}</td>
					<td headers="headerCreatedAt">{formatDate(country.created_at)}</td>
					<td headers="headerOptions">
						<span class="options-span" style="color: #a3fff1" id={"trigger-" + country.id}>Options</span>
						<Dropdown triggeredBy={"#trigger-" + country.id}>
							<DropdownItem on:click={() => onEdit($selectedCountry)}>Edit</DropdownItem>
							<DropdownItem on:click={() => onDelete(country)}>Delete</DropdownItem>
						</Dropdown>
					</td>
				</tr>
			{/each}
			</tbody>
		</table>
		<div class="button-block">
			<div class="spacer"></div>
			<button type="button" class="btn variant-filled-primary btn-sm create-button" on:click={onCreate}>Create</button>
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

	/*needed for screen readers*/
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}
</style>
