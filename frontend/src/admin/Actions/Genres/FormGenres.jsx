import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import axios from '../../../config/axiosConfig';
import { useParams } from 'react-router-dom';

function FormGenres() {
	const [genres, setGenres] = useState([]);
	const { id } = useParams();
	const isEditForm = Boolean(id);
	const fetchData = async () => {
		try {
		const genresResponse=await axios.get('/genres')

			setGenres(genresResponse.data);
		

			if (isEditForm) {
				const genresResponse = await axios.get(`/genres/${id}`);
				const genresData = genresResponse.data;

				formik.setValues({
					name: genresData.name,

				});

				
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id, isEditForm]);



	const formik = useFormik({
		initialValues: {
			name: '',
			
	
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Tên không được trống'),
	
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const requestData = {
					name: values.name,
					
				};

				let response;
				if (isEditForm) {
					response = await axios.put(`/genres/${id}`, requestData);
				} else {
					response = await axios.post('/genres', requestData);
				}

				if (response.status === 200) {
					const message = isEditForm
						? 'Thể loại đã được cập nhật thành công'
						: 'Thể loại đã được thêm thành công';
					toast.success(message);
				} else {
					toast.error('Thêm không thành công.');
				}
			} catch (error) {
				console.error('Đã xảy ra lỗi:', error.message);
			}
			setSubmitting(false);
		},
	});
 
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="max-w-2xl px-4 py-4 mx-auto lg:py-4">
				<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
					{isEditForm ? 'Cập nhật thể loại' : 'Thêm thể loại'}
				</h2>
				<ToastContainer />
				<form
					onSubmit={formik.handleSubmit}
					method="post"
					encType="multipart/form-data"
				>
					
					<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
				
                        <div className="sm:col-span-2">
							<label
								htmlFor="name"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Tên thể loại
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								value={formik.values.name}
								onChange={formik.handleChange}
								placeholder="Nhập tên thể loại"
								required=""
							/>
							{formik.errors.name && (
								<p className="text-red-600 text-sm">
									{formik.errors.name}
								</p>
							)}
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<button
							type="submit"
							className="text-white   bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							{isEditForm ? 'Cập nhật' : 'Thêm'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}

export default FormGenres;
