import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import axios from '../../../config/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

function FormBook() {
	const [genres, setGenres] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [imageFile, setImageFile] = useState(null);
	const [pdfFile, setPdfFile] = useState(null);
	const [currentImageUrl, setCurrentImageUrl] = useState('');
	const { id } = useParams();
	const isEditForm = Boolean(id);
	const navigate = useNavigate();
	const fetchData = async () => {
		try {
			const [genresResponse, authorsResponse] = await Promise.all([
				axios.get('/genres'),
				axios.get('/author'),
			]);

			setGenres(genresResponse.data);
			setAuthors(authorsResponse.data);

			if (isEditForm) {
				const bookResponse = await axios.get(`/book/${id}`);
				const bookData = bookResponse.data;

				formik.setValues({
					name: bookData.name,
					content: bookData.content,
					publishedDate: bookData.publishedDate,
					premium: bookData.premium,
					author: bookData.author._id,
				});

				setSelectedGenres(bookData.genres);
				setCurrentImageUrl(bookData.images);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id, isEditForm]);

	const handleGenreChange = (genreId, isChecked) => {
		setSelectedGenres((prevSelectedGenres) => {
			if (isChecked) {
				return [...prevSelectedGenres, genreId];
			} else {
				return prevSelectedGenres.filter((id) => id !== genreId);
			}
		});
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			content: '',
			publishedDate: '',
			premium: false,
			author: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Tên không được trống'),
			content: Yup.string().required('Nội dung không được trống'),
			publishedDate: Yup.string().required(
				'Ngày xuất bản không được trống',
			),
			author: Yup.string().required('Tác giả phải được chọn'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const requestData = {
					name: values.name,
					content: values.content,
					publishedDate: values.publishedDate,
					premium: values.premium,
					genres: selectedGenres,
					author: values.author,
					image: imageFile,
					pdfFile: pdfFile,
				};
				console.log(requestData);
				let response;
				if (isEditForm) {
					response = await axios.put(`/book/${id}`, requestData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
					);
				} else {
					response = await axios.post('/book', requestData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					});
				}

				if (response.status === 200) {
					const message = isEditForm
						? 'Sách đã được cập nhật thành công'
						: 'Sách đã được thêm thành công';
					toast.success(message);
					navigate('/admin/books');
				} else {
					toast.error('Thêm không thành công.');
				}
			} catch (error) {
				console.error('Đã xảy ra lỗi:', error.message);
			}
			setSubmitting(false);
		},
	});

	const handleImageChange = (e) => {
		setImageFile(e.target.files[0]);
		
	};
	const handlePdfFileChange = (e) => {
		const file = e.target.files[0];
		setPdfFile(file);
	};

	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="max-w-2xl px-4 py-4 mx-auto lg:py-4">
				<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
					{isEditForm ? 'Cập nhật sách' : 'Thêm sách'}
				</h2>
				<ToastContainer />
				<form
					onSubmit={formik.handleSubmit}
					method="post"
					encType="multipart/form-data"
				>
					<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
						<div className="mb-4">
							<label
								htmlFor="pdfFile"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								File PDF
							</label>
							<input
								type="file"
								id="pdfFile"
								name="pdfFile"
								accept=".pdf"
								onChange={handlePdfFileChange}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							/>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="name"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Tên sách
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								value={formik.values.name}
								onChange={formik.handleChange}
								placeholder="Nhập tên sản phẩm"
								required=""
							/>
							{formik.errors.name && (
								<p className="text-red-600 text-sm">
									{formik.errors.name}
								</p>
							)}
						</div>
						<div className="mb-4">
							<label
								htmlFor="image"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Ảnh
							</label>
							<input
								type="file"
								id="image"
								name="image"
								accept="image/*"
								onChange={handleImageChange}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							/>
						</div>
						<div className='flex '>
							{imageFile && (
							<div className="mb-4 mr-1">
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Xem trước ảnh
								</label>
								<img
									src={URL.createObjectURL(imageFile)}
									alt="Preview"
									className="w-52 h-52 rounded-lg"
								/>
							</div>
						)}
						<div>
							{isEditForm && currentImageUrl && (
								<div className="mb-4">
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Ảnh hiện tại
									</label>
									<img
										src={currentImageUrl}
										alt="Current Image"
										className="w-52 h-52 rounded-lg"
									/>
								</div>
							)}
						</div>
						</div>
						
						<div className="w-full">
							<label
								htmlFor="publishedDate"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Ngày xuất bản
							</label>
							<input
								type="date"
								name="publishedDate"
								id="publishedDate"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								value={formik.values.publishedDate}
								onChange={formik.handleChange}
								placeholder="Product brand"
								required=""
							/>
							{formik.errors.publishedDate && (
								<p className="text-red-600 text-sm">
									{formik.errors.publishedDate}
								</p>
							)}
						</div>
						<div className="w-full ">
							<label className="inline-flex items-center cursor-pointer flex-col ">
								<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mb-3">
									Premium
								</span>
								<input
									checked={formik.values.premium}
									onChange={(e) =>
										formik.setFieldValue(
											'premium',
											e.target.checked,
										)
									}
									type="checkbox"
									className="sr-only peer "
								/>
								<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							</label>
						</div>
						<div>
							<label
								htmlFor="genres"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Thể loại
							</label>
							{genres.map((genre) => (
								<div
									key={genre._id}
									className="flex items-center mb-2"
								>
									<label className="items-center cursor-pointer ">
										<input
											id={`genre-${genre._id}`}
											type="checkbox"
											value={genre._id}
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
											checked={selectedGenres.includes(
												genre._id,
											)}
											onChange={(e) =>
												handleGenreChange(
													genre._id,
													e.target.checked,
												)
											}
										/>
										<span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											{genre.name}
										</span>
									</label>
								</div>
							))}
						</div>
						<div>
							<label
								htmlFor="author"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Tác giả
							</label>
							<select
								id="author"
								name="author"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								value={formik.values.author}
								onChange={formik.handleChange}
							>
								<option value="" disabled>
									Chọn tác giả
								</option>
								{authors.map((author) => (
									<option key={author._id} value={author._id}>
										{author.name}
									</option>
								))}
							</select>
							{formik.errors.author && (
								<p className="text-red-600 text-sm">
									{formik.errors.author}
								</p>
							)}
						</div>
						<div className="sm:col-span-2">
							<label
								htmlFor="content"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Nội dung
							</label>
							<ReactQuill
								id="content"
								name="content"
								value={formik.values.content || ''}
								onChange={(value) =>
									formik.setFieldValue('content', value)
								}
								className="bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Nhập nội dung..."
							/>

							{formik.errors.content && (
								<p className="text-red-600 text-sm">
									{formik.errors.content}
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

export default FormBook;
