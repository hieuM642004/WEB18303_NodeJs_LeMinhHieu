import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import getUsersFromLocalStorage from '../../utils/getDataUser';
import { io } from 'socket.io-client';
const socket = io.connect('http://localhost:3001');
import { useParams } from 'react-router-dom';
function CommentSection() {
	const [rating, setRating] = useState(0);
	const [comments, setComments] = useState([]);
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const { id } = useParams();
	useEffect(() => {
		socket.on('All comments', (commentsData) => {
			const filteredComments = commentsData.filter(
				(comment) => comment.bookId === id,
			);
			setComments(filteredComments);
		});

		socket.on('Received message', (newComment) => {
			console.log('reci comments');
			setComments((prevComments) => [...prevComments, newComment]);
		});

		return () => {
			socket.off('All comments');
			socket.off('Received message');
		};
	}, [id]);

	const handleRating = (selectedRating) => {
		setRating(selectedRating);
	};

	
	const handleSendComment = (e) => {
		e.preventDefault();
		const commentText = e.target.elements.comment.value;
		const emoji = chosenEmoji ? chosenEmoji.emoji : '';
		const commentWithEmoji = `${emoji} ${commentText}`;
		const commentData = {
			userId: getUsersFromLocalStorage()[0],
			bookId: id,
			text: commentWithEmoji,
			rating: rating,
		};

		try {
			socket.emit('Send_message', commentData, (newComment) => {
				setComments((prevComments) => [...prevComments, newComment]);
			});

			e.target.elements.comment.value = '';
      setRating(0)
		} catch (error) {
			console.error('Error sending comment:', error);
		}
	};
	return (
		<section className="bg-white dark:bg-gray-900 py-2 lg:py-16 antialiased">
			<div className="max-w-2xl mx-auto px-4">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
						Bình luận ({comments.length})
					</h2>
				</div>
				<form className="mb-6" onSubmit={handleSendComment}>
					<div className="flex items-center mb-2">
						{[...Array(5)].map((_, index) => (
							<svg
								key={index}
								className={`w-5 h-5   ${index < rating ? 'text-yellow-300' : 'text-gray-300'}  me-1  `}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
								onClick={() => handleRating(index + 1)}
							>
								<path
									className="cursor-pointer "
									d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
								/>
							</svg>
						))}
					</div>
					<div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
						<label htmlFor="comment" className="sr-only">
							Bình luận của bạn
						</label>

						<textarea
							id="comment"
							name="comment"
							rows="6"
							className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
							placeholder="Viết nội dung..."
							required
						></textarea>
					</div>
					{/* <EmojiPicker onEmojiClick /> */}
					<button
						type="submit"
						className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-gray-300"
					>
						Gửi
					</button>
				</form>
				<div>
					{comments.map((comment, index) => (
						<article
							key={index}
							className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
						>
							<footer className="flex justify-between items-center mb-2">
								<div className="flex items-center">
									<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
										<img
											className="mr-2 w-6 h-6 rounded-full"
											src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
											alt="Michael Gough"
										/>
										{comment && comment.userId}
									</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										<time
											pubdate
											datetime="2022-02-08"
											title="February 8th, 2022"
										>
											{comment && comment.createdAt}
										</time>
									</p>
								</div>
								<button
									id="dropdownComment1Button"
									data-dropdown-toggle="dropdownComment1"
									className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
									type="button"
								>
									<svg
										className="w-4 h-4"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 16 3"
									>
										<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
									</svg>
									<span className="sr-only">
										Comment settings
									</span>
								</button>

								<div
									id="dropdownComment1"
									className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
								>
									<ul
										className="py-1 text-sm text-gray-700 dark:text-gray-200"
										aria-labelledby="dropdownMenuIconHorizontalButton"
									>
										<li>
											<a
												href="#"
												className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												Edit
											</a>
										</li>
										<li>
											<a
												href="#"
												className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												Remove
											</a>
										</li>
										<li>
											<a
												href="#"
												className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												Report
											</a>
										</li>
									</ul>
								</div>
							</footer>

							<div className="flex items-center">
								{[...Array(5)].map((_, index) => (
									<svg
										key={index}
										className={`w-4 h-4 ${index < comment.rating ? 'text-yellow-300' : 'text-gray-500'} me-1`}
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 22 20"
									>
										<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
									</svg>
								))}
								<p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
									4.95
								</p>
								<p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
									out of
								</p>
								<p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
									5
								</p>
							</div>

							<p className="text-gray-500 dark:text-gray-400">
								{comment && comment.text}
							</p>
							<div className="flex items-center mt-4 space-x-4">
								<button
									type="button"
									className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
								>
									<svg
										className="mr-1.5 w-3.5 h-3.5"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 20 18"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
										/>
									</svg>
									Reply
								</button>
							</div>
						</article>
					))}
				</div>

				<article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
					<footer className="flex justify-between items-center mb-2">
						<div className="flex items-center">
							<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
								<img
									className="mr-2 w-6 h-6 rounded-full"
									src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
									alt="Jese Leos"
								/>
								Jese Leos
							</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								<time
									pubdate
									datetime="2022-02-12"
									title="February 12th, 2022"
								>
									Feb. 12, 2022
								</time>
							</p>
						</div>
						<button
							id="dropdownComment2Button"
							data-dropdown-toggle="dropdownComment2"
							className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							type="button"
						>
							<svg
								className="w-4 h-4"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 16 3"
							>
								<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
							</svg>
							<span className="sr-only">Comment settings</span>
						</button>

						<div
							id="dropdownComment2"
							className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
						>
							<ul
								className="py-1 text-sm text-gray-700 dark:text-gray-200"
								aria-labelledby="dropdownMenuIconHorizontalButton"
							>
								<li>
									<a
										href="#"
										className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Edit
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Remove
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Report
									</a>
								</li>
							</ul>
						</div>
					</footer>
					<p className="text-gray-500 dark:text-gray-400">
						Chính xác
					</p>
					<div className="flex items-center mt-4 space-x-4">
						<button
							type="button"
							className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
						>
							<svg
								className="mr-1.5 w-3.5 h-3.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 18"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
								/>
							</svg>
							Trả lời
						</button>
					</div>
				</article>
			</div>
		</section>
	);
}

export default CommentSection;
