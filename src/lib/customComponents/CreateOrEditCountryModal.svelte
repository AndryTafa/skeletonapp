<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal, Button, Input, Label } from 'flowbite-svelte';


	export let open = false;
	let newCountryName = '';

	const dispatch = createEventDispatcher();

	function handleCreateSubmit() {
		dispatch('create', { newCountryName });
		newCountryName = ''; // Reset the form
		open = false; // Close the modal
	}
</script>

<Modal title="Create Country" bind:open={open} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-2" on:submit|preventDefault={handleCreateSubmit}>
		<Label class="space-y-10">
			<Input type="text" bind:value={newCountryName} placeholder="e.g. Italy" required />
		</Label>
		<Button type="submit" class="btn">ADD</Button>
	</form>
</Modal>
