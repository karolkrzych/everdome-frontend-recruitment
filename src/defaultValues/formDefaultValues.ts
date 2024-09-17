import { Country, IFormInput } from '@/interfaces/form';

export const defaultValues: IFormInput = {
	name: '',
	country: '',
	duration: 1,
	password: '',
};

const countries: Country[] = [
	{ value: 'pl', div: 'Poland' },
	{ value: 'gr', div: 'Germany' },
	{ value: 'es', div: 'Spain' },
	{ value: 'fr', div: 'France' },
];

export const getCountries = (isPublic: boolean): Country[] => {
	const excludedCountriesWhilePublic = ['es', 'fr'];
	if (!isPublic) {
		return countries.filter(
			({ value }) => !excludedCountriesWhilePublic.includes(value)
		);
	}
	return countries;
};
