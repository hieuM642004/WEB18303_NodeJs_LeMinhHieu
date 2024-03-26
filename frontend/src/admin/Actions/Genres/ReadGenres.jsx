import { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal';

function ReadGenres() {
	
	const [genres, setGenres] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	useEffect(() => {
		async function fetchData() {
			try {
				const res=await axios.get('/genres')
                setGenres(res.data)
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		fetchData();
	}, [isConfirmationOpen]);

	const handleDelete = (genre) => {
		setSelectedGenre(genre);
		setIsConfirmationOpen(true);
	};

	const handleCloseConfirmation = () => {
		setSelectedGenre(null);
		setIsConfirmationOpen(false);
	};

	const handleConfirmDelete = async () => {
		if (!selectedGenre) return;

		try {
			await axios.delete(`/genres/${selectedGenre._id}`);
			toast.success('Xóa thành công');

			handleCloseConfirmation();
		} catch (error) {
			console.error('Lỗi khi xóa sách:', error);
		}
	};

  
	return (
		<section>
			<Link to={'/admin/genres/add-genre'}>
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
									Tên thể loại
								</p>
							</th>
						
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Ngày tạo
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Cập nhật gần nhất
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Hành động
								</p>
							</th>
							
						</tr>
					</thead>
					<tbody>
						{genres.map((genre, index) => (
							<tr key={index}>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{index + 1}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										
                                    {genre && genre.name}
									</p>
								</td>
								
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										
                                    {genre && genre.createdAt}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										
                                    {genre && genre.updatedAt}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<Link
										to={`/admin/genres/edit-genre/${genre._id}`}
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
										onClick={() => handleDelete(genre)}
										className="text-white bg-red-700 text-xs font-medium hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-2 py-2 me-1 mb-2"
									>
										<FontAwesomeIcon icon={faTrash} />
									</button>

									<ConfirmationModal
										isOpen={isConfirmationOpen}
										onClose={handleCloseConfirmation}
										onConfirm={handleConfirmDelete}
										title="Xác nhận xóa thể loại"
										content={`Bạn có chắc chắn muốn xóa thể loại "${selectedGenre?.name}" không?`}
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

export default ReadGenres;
