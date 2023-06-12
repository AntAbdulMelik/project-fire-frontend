import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import InputField from 'src/shared/components/form-elements/InputField';
import LoadingSpinner from 'src/shared/components/utils/LoadingSpinner';

const ResetPassword = () => {
	const { userId, token } = useParams<{ userId: string; token: string }>();
	const [isLoading, setIsLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Passwords do not match.');
			return;
		}
		setIsLoading(true);
		try {
			const response = await axios.post(
				`${baseUrl}/api/users/${userId}/reset-password/${token}`,
				{
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			toast.success(response.data.message);
		} catch (error: any) {
			toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
		}
		setIsLoading(false);
	};

	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<div className='flex h-screen flex-col items-center justify-center'>
					<div className='w-full max-w-3xl p-10 text-center md:w-5/6 lg:w-4/6'>
						<h1 className='mb-10 font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey'>
							Reset Password
						</h1>
						<form className='flex flex-col items-center justify-center text-base' onSubmit={handleFormSubmit}>
							<InputField
								className='mb-[21px]'
								label='New Password'
								htmlFor='password'
								required
								type='password'
								id='password'
								value={password}
								placeholder='Enter your password'
								handleInput={password => setPassword(password)}
							/>
							<InputField
								className='mb-[34px]'
								label='Confirm Password'
								htmlFor='confirm-password'
								required
								type='password'
								id='confirm-password'
								value={confirmPassword}
								placeholder='Confirm your password'
								handleInput={confirmPassword => setConfirmPassword(confirmPassword)}
							/>
							<button
								className='w-full rounded-md bg-deep-teal px-[10px] py-3 font-gilroy-semi-bold font-semibold text-white hover:saturate-[400%]'
								type='submit'
							>
								Reset Password
							</button>
						</form>
					</div>
					<div className='font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal'>
						Changed your mind?{' '}
						<Link to='/login'>
							<span className='font-gilroy-bold font-bold hover:cursor-pointer hover:underline'>Go back.</span>
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default ResetPassword;