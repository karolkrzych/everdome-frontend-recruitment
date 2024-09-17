import { IFormInput } from '@/interfaces/form';

const handleFormSubmit = async (data: IFormInput, isPublic: boolean) => {
	try {
		const response = await fetch('/api/submitForm', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({data, isPublic}),
		});

		return await response.json();
	} catch (error) {
		console.error('Form submission failed:', error);
	}
};

export default handleFormSubmit;
