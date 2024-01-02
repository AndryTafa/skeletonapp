<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal, Button, Input, Label } from 'flowbite-svelte';


	export let open = false;
	export let countryName = '';

	const dispatch = createEventDispatcher();

	function handleCreateSubmit() {
		dispatch('createCountryDispatcher', { newCountryName: countryName });
		countryName = '';
		open = false;
	}
</script>

<Modal title="Create Country" bind:open={open} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-2" on:submit|preventDefault={handleCreateSubmit}>
		<Label class="space-y-10">
			<Input type="text" bind:value={countryName} placeholder="e.g. Italy" required />
		</Label>
		<Button type="submit" class="btn">ADD</Button>
	</form>
</Modal>
