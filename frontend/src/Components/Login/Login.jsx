import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../config/axiosConfig';

const LoginSchema = Yup.object().shape({
	username: Yup.string().required('Tên đăng nhập không được trống'),
	password: Yup.string().required('Mật khẩu không được trống'),
});

const Login = () => {
	const navigate = useNavigate();

	const handleLogin = async (values, { setSubmitting }) => {
		try {
			const response = await axios.post('/auth/login', {
				username: values.username,
				password: values.password,
			});

			if (response.status === 200) {
				const data = response.data;
				localStorage.setItem(
					'user',
					JSON.stringify([
						data._id,
						data.username,
						data.avatar,
						data.email,
						data.premium,
						data.hasFollow,
					]),
				);
				document.cookie = `token=${data.accessToken};max-age=${data.expiresIn};path=/`;
				navigate('/');
				window.location.reload();
			} else {
				console.error('Login failure!');
			}
		} catch (error) {
			toast.error('Tên hoặc mật khẩu không đúng!!!');
			console.error('Error:', error.message);
		}
	};

	return (
		<section>
			<div className="relative flex flex-col text-gray-700 bg-transparent shadow-md p-4 mt-2 rounded-xl bg-clip-border">
				<h4 className="text-center block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
					Đăng nhập
				</h4>
				<ToastContainer />
				<Formik
					initialValues={{ username: '', password: '' }}
					validationSchema={LoginSchema}
					onSubmit={handleLogin}
				>
					{({ isSubmitting }) => (
						<Form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
							<div className="flex flex-col gap-4 mb-1">
								<h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
									Tên đăng nhập
								</h6>
								<Field
									type="text"
									name="username"
									placeholder="Nhập tên đăng nhập"
									className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
								/>
								<ErrorMessage
									name="username"
									component="div"
									className="text-red-500 text-sm"
								/>

								<h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
									Mật khẩu
								</h6>
								<Field
									type="password"
									name="password"
									placeholder="Nhập mật khẩu"
									className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
								/>
								<ErrorMessage
									name="password"
									component="div"
									className="text-red-500 text-sm"
								/>
							</div>
							<p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed  text-gray-700">
								<Link to="/register">
									<a className="font-medium text-sm text-gray-900">
										Quên mật khẩu?
									</a>
								</Link>
							</p>
							<div className="items-center">
								<button
									className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="submit"
									disabled={isSubmitting}
								>
									Đăng nhập
								</button>
							</div>
							<p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
								Bạn chưa có tài khoản?
								<Link to="/register">
									<a className="font-medium text-gray-900">
										Đăng kí
									</a>
								</Link>
							</p>
						</Form>
					)}
				</Formik>
			</div>
		</section>
	);
};

export default Login;
