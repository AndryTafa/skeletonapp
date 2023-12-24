<script lang="ts">

	import type { Country } from '$lib/types';

	export let data: Promise<{ body: { countries: Country[] } }>;
</script>

<div>
	<h1>Home</h1>
	{#await data}
		<p>...loading</p>
	{:then data}
		<table>
			<thead>
			<tr>
				<th>ID</th>
				<th>Country</th>
				<th>Created at</th>
				<th>Edited at</th>
			</tr>
			</thead>
			<tbody>
			{#each data.body.countries as country}
				<tr>
					<td>{country.id}</td>
					<td>{country.name}</td>
					<td>{country.created_at}</td>
					<td>{country.edited_at}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>
