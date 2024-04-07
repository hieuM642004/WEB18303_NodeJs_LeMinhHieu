import { useEffect, useState, useRef } from 'react';
import axios from '../../../config/axiosConfig';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPenToSquare,
	faTrash,
	faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal';
import { DownloadTableExcel } from 'react-export-table-to-excel';
function ReadBooks() {
	const [books, setBooks] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [genres, setGenres] = useState({});
	const [authors, setAuthors] = useState([]);
	const [selectedBook, setSelectedBook] = useState(null);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	const tableRef = useRef(null);
	useEffect(() => {
		async function fetchData() {
			try {
				const [booksResponse, genresResponse, authorsResponse] =
					await Promise.all([
						axios.get(`/book?page=${currentPage}`),
						axios.get('/genres'),
						axios.get('/author'),
					]);
				setBooks(booksResponse.data.book);
				setTotalPages(booksResponse.data.totalPages);
				setTotalCount(booksResponse.data.totalCount);
				setGenres(genresResponse.data);
				setAuthors(authorsResponse.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		fetchData();
	}, [currentPage]);

	const handleDelete = (book) => {
		setSelectedBook(book);
		setIsConfirmationOpen(true);
	};

	const handleCloseConfirmation = () => {
		setSelectedBook(null);
		setIsConfirmationOpen(false);
	};

	const handleConfirmDelete = async () => {
		if (!selectedBook) return;

		try {
			await axios.delete(`/book/${selectedBook._id}`);
			const updatedBooks = books.filter(
				(book) => book._id !== selectedBook._id,
			);
			setBooks(updatedBooks);
			setTotalCount(totalCount - 1);
			setIsConfirmationOpen(false);
		} catch (error) {
			console.error('Error delete:', error);
		}
	};
	return (
		<section>
			<div className="flex items-center">
				<Link to={'/admin/books/add-book'}>
					<button
						type="button"
						className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					>
						Thêm
					</button>
				</Link>
				<DownloadTableExcel
					filename="users table"
					sheet="users"
					currentTableRef={tableRef.current}
				>
					<button title="Xuất file excel">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="50"
							height="50"
							viewBox="0 0 48 48"
						>
							<path
								fill="#169154"
								d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"
							></path>
							<path
								fill="#18482a"
								d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"
							></path>
							<path
								fill="#0c8045"
								d="M14 15.003H29V24.005000000000003H14z"
							></path>
							<path
								fill="#17472a"
								d="M14 24.005H29V33.055H14z"
							></path>
							<g>
								<path
									fill="#29c27f"
									d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"
								></path>
								<path
									fill="#27663f"
									d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"
								></path>
								<path
									fill="#19ac65"
									d="M29 15.003H44V24.005000000000003H29z"
								></path>
								<path
									fill="#129652"
									d="M29 24.005H44V33.055H29z"
								></path>
							</g>
							<path
								fill="#0c7238"
								d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"
							></path>
							<path
								fill="#fff"
								d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"
							></path>
						</svg>
					</button>
				</DownloadTableExcel>
			</div>

			<div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
				<table
					className="w-full text-left table-auto min-w-max"
					ref={tableRef}
				>
					<thead >
						<tr>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									#
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Tên sách
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Ảnh
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Hình thức sử dụng
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Mô tả
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									File PDF
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Ngày xuất bản
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Thể loại
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Tác giả
								</p>
							</th>
							<th
								colSpan={2}
								className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
							>
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Hành động
								</p>
							</th>
						</tr>
					</thead>
					<tbody>
						{books.map((book, index) => (
							<tr key={index}>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{index + 1}
									</p>
								</td>

								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{book.name}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{book.images &&
											book.images.map(
												(imageUrl, imageIndex) => (
													<div key={imageIndex}>
														<img
															className="w-20 h-20"
															src={imageUrl}
															alt={`book-image-${imageIndex}`}
														/>
													</div>
												),
											)}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{book.premium ? 'Trả phí' : 'Miễn phí'}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
								<p
											className="text-balance mx-auto font-sans text-base antialiased font-light leading-relaxed text-inherit"
											dangerouslySetInnerHTML={{
												__html:
													book.content.length > 100
														? book.content.substring(
																0,
																100,
															) + '...'
														: book.content,
											}}
										></p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<a
										target="_blank"
										href={`https://drive.google.com/file/d/${book && book.pdfUrl}/preview`}
										className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
									>
										<FontAwesomeIcon
											icon={faFilePdf}
											className="text-xl"
										/>
									</a>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{book.publishedDate}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{book.genres.map((genreId) => {
											const genre = genres.find(
												(g) => g._id === genreId,
											);
											return (
												<span
													key={genreId}
													className="inline-block px-2 py-1 mr-1 text-sm font-semibold leading-none text-blue-700 bg-blue-100 rounded-full"
												>
													{genre
														? genre.name
														: 'Unknown Genre'}
												</span>
											);
										})}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{authors.find(
											(author) =>
												author._id === book.author,
										)?.name || 'Chưa có'}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<Link
										to={`/admin/books/edit-book/${book._id}`}
									>
										{' '}
										<button
											type="button"
											className="text-white bg-blue-700 text-xs font-medium hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg  px-2 py-2 me-1 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
										>
											<FontAwesomeIcon
												icon={faPenToSquare}
											/>
										</button>
									</Link>
									<button
										onClick={() => handleDelete(book)}
										className="text-white bg-red-700 text-xs font-medium hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-2 py-2 me-1 mb-2"
									>
										<FontAwesomeIcon icon={faTrash} />
									</button>

									<ConfirmationModal
										isOpen={isConfirmationOpen}
										onClose={handleCloseConfirmation}
										onConfirm={handleConfirmDelete}
										title="Xác nhận xóa sách"
										content={`Bạn có chắc chắn muốn xóa sách "${selectedBook?.name}" không?`}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-center gap-4 mt-5">
				<button
					disabled={currentPage === 1}
					className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 ${
						currentPage === 1
							? 'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
							: ''
					}`}
					type="button"
					onClick={() => setCurrentPage(currentPage - 1)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="currentColor"
						aria-hidden="true"
						className="w-4 h-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						></path>
					</svg>
					Previous
				</button>
				<div className="flex items-center gap-2">
					{Array.from({ length: totalPages }, (_, index) => (
						<button
							key={index}
							className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${
								currentPage === index + 1
									? 'bg-gray-900 text-white'
									: 'text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20'
							}`}
							type="button"
							onClick={() => setCurrentPage(index + 1)}
						>
							<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
								{index + 1}
							</span>
						</button>
					))}
				</div>
				<button
					disabled={currentPage === totalPages}
					className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 ${
						currentPage === totalPages
							? 'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
							: ''
					}`}
					type="button"
					onClick={() => setCurrentPage(currentPage + 1)}
				>
					Next
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="currentColor"
						aria-hidden="true"
						className="w-4 h-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
						></path>
					</svg>
				</button>
			</div>
		</section>
	);
}

export default ReadBooks;
