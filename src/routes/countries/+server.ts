import { json } from '@sveltejs/kit';
import type { Country } from '$lib/types';
import { supabase } from '$lib/supabaseClient';

export async function GET() {
	const { data, error } = await supabase.from('Countries').select('*');

	if (error) throw error;

	const countries: Country[] = data.map((country: Country) => ({
		id: country.id,
		name: country.name,
		created_at: country.created_at,
		edited_at: country.edited_at
	}));

	return json({ countries });
}

export async function POST() {
	const countryName = "New Country";

	// Create a new country record in the database
	const { error } = await supabase.from('Countries').insert([
		{ name: countryName }
	]);

	if (error) {
		return json({ message: error.message }, { status: 500 });
	}

	// Return a success message
	return json({ message: "Country created successfully" }, { status: 201 });
}
