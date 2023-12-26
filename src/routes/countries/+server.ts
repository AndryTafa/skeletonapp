import { json, type RequestHandler } from '@sveltejs/kit';
import type { CountryModel } from '$lib/types';
import { supabase } from '$lib/supabaseClient';

export async function GET() {
	const { data, error } = await supabase.from('Countries').select('*');

	if (error) throw error;

	const countries: CountryModel[] = data.map((country: CountryModel) => ({
		id: country.id,
		name: country.name,
		created_at: country.created_at,
		edited_at: country.edited_at
	}));

	return json({ countries });
}

export const POST: RequestHandler = async ({ request }) => {
	// Parse the request body to get the country name
	const body = await request.json();
	const countryName = body.name;

	// Validate the input
	if (typeof countryName !== 'string' || countryName.trim() === '') {
		return json({ message: 'Invalid country name' }, { status: 400 });
	}

	// Create a new country record in the database
	const { error } = await supabase.from('Countries').insert([
		{ name: countryName }
	]);

	if (error) {
		return json({ message: error.message }, { status: 500 });
	}

	// Return a success message
	return json({ message: "Country created successfully" }, { status: 201 });
};
