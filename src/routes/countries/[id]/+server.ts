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
	console.log("Updating country with ID:", countryId);
	console.log("Updating country with name:", updatedCountryName);

	const countryIdNum = parseInt(countryId, 10);
	if (isNaN(countryIdNum)) {
		return json({ message: "Invalid country ID" }, { status: 400 });
	}

	const { data, error } = await supabase.from('Countries').update({
		name: updatedCountryName
	}).match({ id: countryId });

	if (error) {
		console.error("Update error:", error); // Additional logging
		return json({ message: error.message }, { status: 500 });
	}

	// Optional: Log the updated data for verification
	console.log("Updated data:", data);

	return json({ message: "Country updated successfully", data }, { status: 200 });
}
