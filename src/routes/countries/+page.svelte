<script lang="ts">

	import type { Country } from '$lib/types';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';


	export let data: Promise<{ body: { countries: Country[] } }>;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function handleDelete() {
		console.log('delete clicked');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function handleEdit() {
		console.log('edit clicked');
	}

	const formatDate = (dateString: string): string => {
		return dateString.split('T')[0];
	};
</script>

{#await data}
	<p>Loading...</p>
{:then data}
	<div class="table-block">
		<div class="table-container">
			<table class="table">
				<thead>
				<tr>
					<th scope="col" id="headerId">ID</th>
					<th scope="col" id="headerName">Name</th>
					<th scope="col" id="headerCreatedAt">Created At</th>
					<th scope="col" id="headerOptions">Options</th>
				</tr>
				</thead>
				<tbody>
				{#each data.body.countries as country (country.id)}
					<tr>
						<td headers="headerId">{country.id}</td>
						<td headers="headerName">{country.name}</td>
						<td headers="headerCreatedAt">{formatDate(country.created_at)}</td>
						<td headers="headerOptions">
							<span class="options-span" style="color: #a3fff1">Options</span>
						</td>
						<Dropdown triggeredBy=".options-span">
							<DropdownItem>Edit</DropdownItem>
							<DropdownItem slot="footer">Delete</DropdownItem>
						</Dropdown>
					</tr>
				{/each}
				</tbody>
			</table>
			<div class="button-block">
				<div class="spacer"></div>
				<button type="button" class="btn variant-filled-primary btn-sm create-button">Create</button>
			</div>
		</div>
	</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}


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