import { z } from 'zod';

export const createFormSchema = (isPublic: boolean) => {
	return z
		.object({
			name: z.string().min(3, 'Name too short').max(50, 'Name too long'),
			country: z.string().min(1, 'Country is required'),
			duration: z.number().positive('Duration must be a positive number'),
			password: z.string().optional(),
		})
		.required()
		.refine(
			({ password }) => {
				if (!isPublic) {
					return password && password.length > 0;
				}
				return true;
			},
			{
				message: 'Password is required when the form is private',
				path: ['password'],
			}
		)
		.refine(
			({ password }) => {
				if (!isPublic && password) {
					const hasMinLength = password.length >= 8;
					const hasUpperCase = /[A-Z]/.test(password);
					const hasLowerCase = /[a-z]/.test(password);
					const hasNumber = /[0-9]/.test(password);
					const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(
						password
					);
					return (
						hasMinLength &&
						hasUpperCase &&
						hasLowerCase &&
						hasNumber &&
						hasSpecialChar
					);
				}
				return true;
			},
			{
				message:
					'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
				path: ['password'],
			}
		)
		.refine(
			({ duration }) => {
				if (!isPublic) {
					return duration <= 20;
				}
				return true;
			},
			{
				message: 'Duration cannot exceed 20 days',
				path: ['duration'],
			}
		);
};
