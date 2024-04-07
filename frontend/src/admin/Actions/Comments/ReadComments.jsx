import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal';
import { io } from 'socket.io-client';
function ReadComments() {
	const [comments, setComments] = useState([]);
	const [commentsWithUsername, setCommentsWithUsername] = useState([]);
	const [users, setUsers] = useState([]);
	const [books, setBooks] = useState([]);
	const [isDataReceived, setIsDataReceived] = useState(false);
	const [selectedComment, setSelectedComment] = useState(null);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	var socket = io.connect('http://localhost:3001');
	useEffect(() => {
		async function fetchData() {
			try {
				socket.on('All comments', (commentsData) => {
					setComments(commentsData);
					setIsDataReceived(true); 
				});
				const responseUser = await axios.get('/user');
				setUsers(responseUser.data);
				const responseBook = await axios.get('/book');
				setBooks(responseBook.data.book);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (isDataReceived) {
			const commentsDataWithUsernameAndBook = comments.map((comment) => {
				const user = users.find((user) => user._id === comment.userId);
				const book = books.find((book) => book._id === comment.bookId);
				const username = user ? user.username : 'Unknown';
				const bookName = book ? book.name : 'Unknown';
				return { ...comment, username, bookName };
			});
			setCommentsWithUsername(commentsDataWithUsernameAndBook);
		}
	}, [comments, users, books, isDataReceived]);

	const handleDelete = (comment) => {
		setSelectedComment(comment);
		setIsConfirmationOpen(true);
	};

	const handleCloseConfirmation = () => {
		setSelectedComment(null);
		setIsConfirmationOpen(false);
	};

	const handleConfirmDelete = async () => {
		if (!selectedComment) return;

		try {
			socket.emit('Delete_comment', { commentId: selectedComment._id });
			toast.success('Comment deleted successfully');
			handleCloseConfirmation();
			setCommentsWithUsername((prevComments) =>
				prevComments.filter(
					(comment) => comment._id !== selectedComment._id,
				),
			);
		} catch (error) {
			console.error('Error deleting comment:', error);
		}
	};

	return (
		<section>
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
									Tên người dùng
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Bài viết
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Nội dung
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Đánh giá
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
						{commentsWithUsername.map((comment, index) => (
							<tr key={index}>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{index + 1}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{comment && comment.username}
									</p>
								</td>

								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{comment && comment.bookName}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{comment && comment.text}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										<div className="flex ">
											{[...Array(5)].map((_, index) => (
												<svg
													key={index}
													className={`w-5 h-5   ${index < comment.rating ? 'text-yellow-300' : 'text-gray-300'}  me-1  `}
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 22 20"
												>
													<path
														className="cursor-pointer "
														d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
													/>
												</svg>
											))}
										</div>
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<button
										onClick={() => handleDelete(comment)}
										className="text-white bg-red-700 text-xs font-medium hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-2 py-2 me-1 mb-2"
									>
										<FontAwesomeIcon icon={faTrash} />
									</button>

									<ConfirmationModal
										isOpen={isConfirmationOpen}
										onClose={handleCloseConfirmation}
										onConfirm={handleConfirmDelete}
										title="Confirm Delete Comment"
										content={`Are you sure you want to delete the comment "${selectedComment && selectedComment.username}"?`}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<ToastContainer />
		</section>
	);
}

export default ReadComments;
