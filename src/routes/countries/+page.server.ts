// src/routes/countries/+server.js
import { supabase } from '$lib/supabaseClient';
import type { Country } from '$lib/types';

export async function load() {
	// get Country table data from Supabase
	const { data, error } = await supabase.from('Country').select('*');
	if (error) throw error;
	// map data to array of Country objects
	const countries: Country[] = data.map((country: Country) => ({
		id: country.id,
		name: country.name,
		created_at: country.created_at,
		edited_at: country.edited_at
	}));
	// return array of Country objects
	return {
		body: {
			countries
		}
	};
}
