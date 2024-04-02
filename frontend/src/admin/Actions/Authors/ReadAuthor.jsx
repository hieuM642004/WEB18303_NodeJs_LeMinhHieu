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
function ReadAuthors() {
	const [authors, setAuthors] = useState([]);
	const [selectedAuthor, setSelectedAuthor] = useState(null);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				const [authorsResponse] = await Promise.all([
					axios.get('/author'),
				]);
				setAuthors(authorsResponse.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		fetchData();
	}, []);

	const handleDelete = (author) => {
		setSelectedAuthor(author);
		setIsConfirmationOpen(true);
	};

	const handleCloseConfirmation = () => {
		setSelectedAuthor(null);
		setIsConfirmationOpen(false);
	};

	const handleConfirmDelete = async () => {
		if (!selectedAuthor) return;

		try {
			await axios.delete(`/author/${selectedAuthor._id}`);
			const updatedAuthors = authors.filter(
				(author) => author._id !== selectedAuthor._id,
			);
			setAuthors(updatedAuthors);
			setIsConfirmationOpen(false);
		} catch (error) {
			console.error('Error delete:', error);
		}
	};
	return (
		<section>
			<div className="flex items-center">
				<Link to={'/admin/author/add-author'}>
					<button
						type="button"
						className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					>
						Thêm
					</button>
				</Link>
			</div>

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
									Tên tác giả
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Ảnh
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Năm sinh
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Số lượng sách đã xuất bản
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Mô tả
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
						{authors.map((author, index) => (
							<tr key={index}>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{index + 1}
									</p>
								</td>

								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{author.name}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{author &&
											
												(<img
													className="w-10 h-10"
													src={author.image}
													alt={`author-image-${author.image}`}
												/>)
											}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{author && author.year}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{author &&
											author.books &&
											author.books.length}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{author &&
										author.description.length > 150
											? `${author.description.substring(
													0,
													50,
												)}...`
											: author.description}
									</p>
								</td>

								<td className="p-4 border-b border-blue-gray-50">
									<Link
										to={`/admin/author/edit-author/${author._id}`}
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
										onClick={() => handleDelete(author)}
										className="text-white bg-red-700 text-xs font-medium hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-2 py-2 me-1 mb-2"
									>
										<FontAwesomeIcon icon={faTrash} />
									</button>

									<ConfirmationModal
										isOpen={isConfirmationOpen}
										onClose={handleCloseConfirmation}
										onConfirm={handleConfirmDelete}
										title="Xác nhận xóa sách"
										content={`Bạn có chắc chắn muốn xóa tác giả "${selectedAuthor?.name}" không?`}
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

export default ReadAuthors;
