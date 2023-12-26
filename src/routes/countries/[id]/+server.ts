import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function DELETE({ params }) {
	const countryId = params.id;

	if (!countryId) return json({ message: "Country ID is required" }, { status: 400 });
	const { error } = await supabase.from('Countries').delete().match({ id: countryId });

	if (error) return json({ message: error.message }, { status: 500 });
	return json({ message: "Country deleted successfully" }, { status: 200 });
}

export async function GET({ params }) {
	const countryId = params.id;

	if (!countryId) return json({ message: "Country ID is required" }, { status: 400 });
	const { data, error } = await supabase.from('Countries').select('*').match({ id: countryId });

	if (error) return json({ message: error.message }, { status: 500 });
	return json(data[0], { status: 200 });
}

export async function PATCH({ request, params }) {
	const countryId = params.id;
	const reqBody = await request.json();
	const updatedCountryName = reqBody.name;

	const currentTime = new Date().toISOString();

	const { error } = await supabase.from('Countries').update({
		name: updatedCountryName,
		edited_at: currentTime
	}).match({ id: countryId });

	if (error) return json({ message: error.message }, { status: 500 });
	return json({ message: "Country updated successfully" }, { status: 200 });
}
