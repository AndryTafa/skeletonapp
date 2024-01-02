export type CountryModel = {
	id: number;
	name: string;
	created_at: string;
	edited_at: string;
};

export type CreateCountryModel = {
	name: string;
};

export type UpdateCountryModel = {
  id: number;
	name: string;
};
