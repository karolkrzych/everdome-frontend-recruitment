'use client';

import { useCallback, useMemo, useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import * as S from './select';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { getCountries, defaultValues } from '@/defaultValues/formDefaultValues';
import { IFormInput } from '@/interfaces/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFormSchema } from '@/schemas/formSchema';
import { ErrorMessage } from './errorMessage';
import handleFormSubmit from '@/requests/handleFormSubmit';

export const Form = () => {
	const [isPublic, setIsPublic] = useState(true);
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
		clearErrors,
	} = useForm<IFormInput>({
		defaultValues,
		resolver: zodResolver(createFormSchema(isPublic)),
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	const countries = useMemo(() => getCountries(isPublic), [isPublic]);

	const handleReset = useCallback(() => {
		reset(defaultValues);
		clearErrors();
	}, [reset, clearErrors]);

	const onSubmit: SubmitHandler<IFormInput> = (data) =>
		handleFormSubmit(data, isPublic).then(handleReset);

	return (
		<form
			className='flex flex-col gap-6 mt-5 mx-auto w-full max-w-[600px]'
			onSubmit={handleSubmit(onSubmit)}
		>
			<h3 className='text-2xl font-semibold'>Example Form</h3>
			<div>
				<div className='flex gap-3 border w-44 rounded-md p-1 mb-3'>
					<Button
						className='flex-1 border-none'
						variant={isPublic ? 'default' : 'outline'}
						onClick={() => setIsPublic(true)}
					>
						Public
					</Button>
					<Button
						className='flex-1 border-none'
						variant={isPublic ? 'outline' : 'default'}
						onClick={() => setIsPublic(false)}
					>
						Private
					</Button>
				</div>
				<div
					className={
						'text-sm font-semibold text-gray-700 block mb-[6px]'
					}
				>
					Name
				</div>
				<Input
					id='name'
					type='text'
					placeholder={'Name..'}
					className='w-full'
					{...register('name')}
				/>
				{errors.name && <ErrorMessage message={errors.name.message} />}
			</div>
			{!isPublic && (
				<div>
					<div
						className={
							'text-sm font-semibold text-gray-700 block mb-[6px]'
						}
					>
						Password
					</div>
					<Input
						id='password'
						type='password'
						placeholder={'Password...'}
						className='w-full'
						{...register('password')}
					/>
					{errors.password && (
						<ErrorMessage message={errors.password.message} />
					)}
				</div>
			)}
			<div>
				<div
					className={
						'text-sm font-semibold text-gray-700 block mb-[6px]'
					}
				>
					Country
				</div>
				<Controller
					name='country'
					control={control}
					render={({ field }) => (
						<S.Select
							onValueChange={field.onChange}
							value={field.value}
						>
							<S.SelectTrigger className='w-full' id={'country'}>
								<S.SelectValue
									placeholder={
										<span className='text-gray-500'>
											{'Select Country...'}
										</span>
									}
								/>
							</S.SelectTrigger>
							<S.SelectContent>
								{countries.map(({ value, div }) => (
									<S.SelectItem key={value} value={value}>
										{div}
									</S.SelectItem>
								))}
							</S.SelectContent>
						</S.Select>
					)}
				/>
				{errors.country && (
					<ErrorMessage message={errors.country.message} />
				)}
			</div>
			<div>
				<div
					className={
						'text-sm font-semibold text-gray-700 block mb-[6px]'
					}
				>
					Duration (Days)
				</div>
				<Input
					data-testid='duration'
					id='duration'
					type='number'
					defaultValue={1}
					className='w-full'
					{...register('duration', { valueAsNumber: true })}
				/>
				{errors.duration && (
					<ErrorMessage message={errors.duration.message} />
				)}
			</div>
			<div className='flex justify-center gap-4 mt-10'>
				<Button type='button' onClick={handleReset}>
					Reset
				</Button>
				<Button type='submit'>Submit</Button>
			</div>
		</form>
	);
};
