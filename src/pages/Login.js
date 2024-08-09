/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/slice/authSlice";
import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import { HiInformationCircle, HiEye, HiEyeOff, HiMail } from "react-icons/hi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (auth.id) {
			navigate("/");
		}
	}, [auth.id, navigate]);

	const handleSubmit = (values) => {
		dispatch(loginUser(values));
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Please enter a valid email address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});

	return (
		<div className='flex justify-center items-center h-screen m-8 bg-gray-100'>
			<div className='max-w-md w-full bg-white p-6 rounded-md shadow-md'>
				<h2 className='text-3xl font-bold text-center mb-4'>Login</h2>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ values, handleChange, handleBlur }) => (
						<Form className='space-y-4'>
							<div>
								<Label htmlFor='email' value='Email' />
								<Field
									as={TextInput}
									id='email'
									type='email'
									name='email'
									placeholder='Enter your email'
									icon={HiMail}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								<ErrorMessage name='email'>
									{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
								</ErrorMessage>
							</div>

							<div>
								<Label htmlFor='password' value='Password' />
								<Field
									as={TextInput}
									id='password'
									type={showPassword ? "text" : "password"}
									name='password'
									placeholder='Enter your password'
									rightIcon={showPassword ? HiEyeOff : HiEye}
									onClick={togglePasswordVisibility}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
								/>
								<ErrorMessage name='password'>
									{(msg) => <div className='text-red-500 text-sm'>{msg}</div>}
								</ErrorMessage>
							</div>

							<div className='flex justify-between items-center'>
								<Link
									to='/signup'
									className='text-sm text-blue-600 hover:underline'
								>
									Don't have an account?
								</Link>
								<Link
									to='/forgotpassword'
									className='text-sm text-blue-600 hover:underline'
								>
									Forgot password?
								</Link>
							</div>

							{auth.loginStatus === "pending" ? (
								<Button disabled className='w-full mt-4'>
									<Spinner aria-label='Loading...' size='sm' />
									<span className='pl-3'>Loading...</span>
								</Button>
							) : (
								<Button
									type='submit'
									gradientDuoTone='purpleToBlue'
									className='w-full mt-4'
								>
									Login
								</Button>
							)}

							{auth.loginStatus === "rejected" && (
								<Alert color='failure' icon={HiInformationCircle}>
									<span className='font-medium'>{auth.loginError}</span>
								</Alert>
							)}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Login;
