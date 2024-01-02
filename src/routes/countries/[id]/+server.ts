import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function DELETE({ params }: { params: { id: string } }) {
	const countryId = params.id;

	if (!countryId) return json({ message: "Country ID is required" }, { status: 400 });
	const { data, error } = await supabase.from('Countries').delete().eq('id', countryId).select();

	if (error) {
    console.error("Error when deleting country", error);
    return json({ message: error.message }, { status: 500 });
  } 
  console.log("Country deleted succesfully: ", data);
	return json({ message: "Country deleted successfully" }, { status: 200 });
}

export async function GET({ params }: { params: { id: string } }) {
	const countryId = params.id;

	if (!countryId) return json({ message: "Country ID is required" }, { status: 400 });
	const { data, error } = await supabase.from('Countries').select('*').eq('id', countryId );

	if (error) {
    console.error("Error when getting country", error);
    return json({ message: error.message }, { status: 500 });
  }

  console.log("Country retrieved succesfully: ", data);
	return json(data[0], { status: 200 });
}

export async function PATCH({ request, params }: { request: Request; params: { id: string } }) {
	const reqBody = await request.json();
	const countryId = params.id;
	const updatedCountryName = reqBody.name;
  const edited_at = new Date().toISOString();

	const { data, error } = await supabase
    .from('Countries')
    .update({ name: updatedCountryName, edited_at: edited_at })
    .eq('id', countryId )
    .select();

	if (error) {
		console.error("Error when updating country", error);
		return json({ message: error.message }, { status: 500 });
	}

  console.log("Data updated succesfully: ", data);
	return json({ message: "Country updated successfully", data }, { status: 200 });
}
