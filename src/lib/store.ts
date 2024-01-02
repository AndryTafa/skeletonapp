import { writable } from 'svelte/store';
import type { CountryModel } from '$lib/types';

export const selectedCountry = writable<CountryModel>();
export let currentSelectedCountry: CountryModel;

selectedCountry.subscribe((value) => {
	console.log(`Selected country is ${value}`);
	currentSelectedCountry = value;
});

export function clearSelectedCountry() {
	selectedCountry.set({} as CountryModel);
}

export function setSelectedCountry(country: CountryModel) {
	selectedCountry.set(country);
}

