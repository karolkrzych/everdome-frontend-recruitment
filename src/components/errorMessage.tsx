interface Props {
    message?: string;
}

export const ErrorMessage = ({ message }: Props) => (
	<span className='text-red-500 text-sm mt-1 block'>{message}</span>
);
