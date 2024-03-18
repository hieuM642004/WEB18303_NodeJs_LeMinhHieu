import { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal';

function ReadBooks() {
	const [books, setBooks] = useState([]);
	const [genres, setGenres] = useState({});
	const [authors, setAuthors] = useState([]);
	const [selectedBook, setSelectedBook] = useState(null);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	useEffect(() => {
		async function fetchData() {
			try {
				const [booksResponse, genresResponse, authorsResponse] =
					await Promise.all([
						axios.get('/book'),
						axios.get('/genres'),
						axios.get('/author'),
					]);

				setBooks(booksResponse.data);

				const genreMap = {};
				genresResponse.data.forEach((genre) => {
					genreMap[genre._id] = genre.name;
				});
				setGenres(genreMap);

				setAuthors(authorsResponse.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		fetchData();
	}, [selectedBook]);

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
			

				toast.success('Xóa thành công');
			

			handleCloseConfirmation();
		} catch (error) {
			console.error('Error delete:', error);
		}
	};
	return (
		<section>
			<Link to={'/admin/books/add-book'}>
				<button
					type="button"
					className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
				>
					Thêm
				</button>
			</Link>
			<div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
				<table className="w-full text-left table-auto min-w-max">
					<thead>
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
									Nội dung
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
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{book.content.length > 50
											? `${book.content.substring(
													0,
													50,
											  )}...`
											: book.content}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{book.publishedDate}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{book.genres.map(
											(genreId, genreIndex) => (
												<span
													key={genreIndex}
													className="inline-block px-2 py-1 mr-1 text-sm font-semibold leading-none text-blue-700 bg-blue-100 rounded-full"
												>
													{genres[genreId]}
												</span>
											),
										)}
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
		</section>
	);
}

export default ReadBooks;
