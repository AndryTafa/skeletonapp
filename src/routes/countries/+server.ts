import { json, type RequestHandler } from '@sveltejs/kit';
import type { CountryModel } from '$lib/types';
import { supabase } from '$lib/supabaseClient';

export async function GET() {
	const { data, error } = await supabase.from('Countries').select('*');

	if (error) {
    console.error("Error when getting countries", error);
    return json({ message: error.message }, { status: 500 });
  }

	const countries: CountryModel[] = data.map((country: CountryModel) => ({
		id: country.id,
		name: country.name,
		created_at: country.created_at,
		edited_at: country.edited_at
	}))

  console.log("Countries retrieved succesfully: ", countries);
	return json({ countries });
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const countryName = body.name;

	// Validate the input
	if (typeof countryName !== 'string' || countryName.trim() === '') {
		return json({ message: 'Invalid country name' }, { status: 400 });
	}

  const { data, error } = await supabase.from('Countries').insert({ name: countryName }).select();

  if (error) {
    console.error("Error when creating country", error);
    return json({ message: error.message }, { status: 500 });
  }

  console.log("Country created succesfully: ", data);
  return json({ message: "Country created successfully", data }, { status: 200 });
};
