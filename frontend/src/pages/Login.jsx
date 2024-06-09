import React, { useEffect, useState } from "react";
import { loginApi, signupApi } from "../services/auth";
import { isLoggedInApi } from "../services/auth";

export const Login = () => {
	const [login, setLogin] = useState(true);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		!login ? signupApi(name, email, password) : loginApi(email, password);
	};
	return (
		<div className='flex justify-center items-center leading-10 w-[100vw] h-[100vh]'>
			<div>
				<div>WELCOME :)</div>
				<div className='text-sm text-green-600'>
					U have to login for using this website
				</div>
				<div className='w-[25vw]'>
					<form
						action=''
						onSubmit={handleSubmit}>
						{!login && (
							<div>
								<label htmlFor='name'>Name</label>
								<div className='border border-green-500 px-2'>
									<input
										type='text'
										id='name'
										className='px-2 w-full outline-none'
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
								</div>
							</div>
						)}
						<div>
							<label htmlFor='email'>Email</label>
							<div className='border border-green-500 '>
								<input
									type='email'
									id='email'
									className='px-2 w-full outline-none'
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>
						</div>
						<div>
							<label htmlFor='password'>Password</label>
							<div className='border border-green-500 '>
								<input
									type='password'
									id='password'
									autoComplete='false'
									className='px-2 w-full outline-none'
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</div>
						</div>
						<button className='border my-4 px-2 hover:bg-slate-200 '>
							Submit
						</button>
					</form>
					{login ? (
						<div>
							New here?{" "}
							<span
								onClick={() => setLogin(!login)}
								className='cursor-pointer hover:underline'>
								Signup
							</span>
						</div>
					) : (
						<div>
							Already signed up?{" "}
							<span
								onClick={() => setLogin(!login)}
								className='cursor-pointer hover:underline'>
								Login ;)
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
