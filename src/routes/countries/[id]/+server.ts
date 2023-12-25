import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function DELETE({ params }) {
	const countryId = params.id;

	if (!countryId) return json({ message: "Country ID is required" }, { status: 400 });
	const { error } = await supabase.from('Countries').delete().match({ id: countryId });

	if (error) return json({ message: error.message }, { status: 500 });
	return json({ message: "Country deleted successfully" }, { status: 200 });
}