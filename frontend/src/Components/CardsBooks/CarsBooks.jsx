import { Link } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getUsersFromLocalStorage from '../../utils/getDataUser';

function CardsBooks() {
	const [books, setBooks] = useState([]);
	const [genres, setGenres] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchBooksAndGenres = async () => {
			try {
				const response = await axios.get(`/book?page=${currentPage}`);
				setBooks(response.data.book);
				setTotalPages(response.data.totalPages);
				const genresResponse = await axios.get('/genres');
				const authorsResponse = await axios.get('/author');
				setGenres(genresResponse.data);
				setAuthors(authorsResponse.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchBooksAndGenres();
	}, [currentPage]);

	const handleClick = (event) => {
		if (event.currentTarget.disabled) {
			event.preventDefault();
		}
	};

	const isPremiumUser = () => {
		const premiumUser = getUsersFromLocalStorage()[4];
		return premiumUser;
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	return (
		<>
			<div className="grid grid-cols-3 gap-4">
				{books.map((book, index) => {
					const author = authors.find(
						(author) => author._id === book.author,
					);

					return (
						<div
							key={index}
							className="relative flex flex-col mt-6 text-gray-700 bg-white  bg-clip-border rounded-xl w-96"
							style={{
								boxShadow:
									'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
							}}
						>
							<div className=" mx-auto">
								{book.images &&
									book.images.map((imageUrl, imageIndex) => (
										<div key={imageIndex}>
											<img
												src={imageUrl}
												alt={`book-image-${imageIndex}`}
												className="w-50"
											/>
										</div>
									))}
							</div>

							<div className="p-6">
								<h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
									{book.name}
								</h5>
								<p className="flex flex-col justify-start font-sans text-base antialiased font-light leading-relaxed text-inherit">
									<div
										className="flex flex-col justify-start font-sans text-base antialiased font-light leading-relaxed text-inherit"
										dangerouslySetInnerHTML={{
											__html:
												book.content.length > 100
													? book.content.substring(
															0,
															100,
														) + '...'
													: book.content,
										}}
									></div>
									<div className="flex">
										{book.genres.map((genreId) => {
											const genre = genres.find(
												(genre) =>
													genre._id === genreId,
											);
											return genre ? (
												<Link
													to={`/genres/${genre._id}`}
													key={genre._id}
												>
													<a className="bg-blue-gray-100 w-fit p-1 text-xs italic rounded-md cursor-pointer m-1">
														<span className="m-2">
															#{genre.name}
														</span>
													</a>
												</Link>
											) : null;
										})}
									</div>
									<div className="flex">
										{author ? (
											<Link
												to={`/author/${author._id}`}
												key={index}
											>
												<span className="bg-blue-gray-100 w-fit p-1 text-xs italic rounded-md cursor-pointer m-1">
													<span className="m-2">
														@{author.name}
													</span>
												</span>
											</Link>
										) : null}
									</div>
								</p>
							</div>

							<div className="p-6 pt-0">
								<Link
									to={
										book.premium && !isPremiumUser()
											? '/pricing'
											: `/book/${book._id}`
									}
								>
									<button
										className={`align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ${
											book.premium && !isPremiumUser()
												? 'disabled:opacity-50 bg-yellow-400 disabled:shadow-none disabled:pointer-events-none '
												: ''
										}`}
										type="button"
										disabled={
											book.premium && !isPremiumUser()
										}
										onClick={handleClick}
									>
										{book.premium ? (
											<FontAwesomeIcon icon={faCrown} />
										) : (
											'Đọc thêm'
										)}
									</button>
								</Link>
							</div>
						</div>
					);
				})}
			</div>
			<div className="flex justify-center mt-8">
				<div className="flex items-center gap-4">
					<button
						disabled={currentPage === 1}
						className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 ${
							currentPage === 1
								? 'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
								: ''
						}`}
						type="button"
						onClick={handlePrevPage}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
							className="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
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
						onClick={handleNextPage}
					>
						Next
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
							className="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</>
	);
}

export default CardsBooks;
