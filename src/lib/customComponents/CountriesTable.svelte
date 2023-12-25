<script lang="ts">
	import type { Country } from '$lib/types';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';

	export let countries: Country[] = [];
	export let onEdit: (country: Country) => void;
	export let onDelete: (country: Country) => void;
	export let onCreate: () => void;

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
							<DropdownItem on:click={() => onEdit(country)}>Edit</DropdownItem>
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
</style>
