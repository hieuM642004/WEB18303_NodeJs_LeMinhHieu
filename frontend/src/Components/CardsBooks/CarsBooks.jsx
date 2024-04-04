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
	const [showPremium, setShowPremium] = useState(false);
	const [showFree, setShowFree] = useState(false);

	useEffect(() => {
		const fetchBooksAndGenres = async () => {
			try {
				let url = `/book?page=${currentPage}`;
				if (showPremium) {
					url += '&premium=true';
				}
				if (showFree) {
					url += '&premium=false';
				}
				const response = await axios.get(url);
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
	}, [currentPage, showPremium, showFree]);

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

	const togglePremium = () => {
		setShowPremium((prevState) => !prevState);
		setShowFree(false);
	};
	const showAll = () => {
		setShowFree(false);
		setShowPremium(false);
	};
	return (
		<>
			<div className="flex justify-center">
				<button
					className="m-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
					onClick={showAll}
				>
					All
				</button>
				<button
					className="m-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
					onClick={togglePremium}
				>
					Pre
				</button>

				<button
					className="m-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
					onClick={() => setShowFree(!showFree)}
				>
					Free
				</button>
			</div>

			<div className="flex flex-wrap -mx-1 lg:-mx-4">
				{books.map((book, index) => {
					const author = authors.find(
						(author) => author._id === book.author,
					);

					return (
						<div
							key={index}
							className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
						>
							<article className="overflow-hidden rounded-lg shadow-lg">
								<a href="#">
									{book.images &&
										book.images.map(
											(imageUrl, imageIndex) => (
												<div key={imageIndex}>
													<img
														src={imageUrl}
														alt={`book-image-${imageIndex}`}
														className="block h-auto w-full"
													/>
												</div>
											),
										)}
								</a>

								<header className="flex items-center justify-between leading-tight p-2 md:p-4">
									<h1 className="text-lg font-semibold">
										
											{book.name}
										
									</h1>
								</header>
								<main className='p-2 md:p-4'>
									<p className="text-grey-darker text-xs text-gray-500" >
									{book.publishedDate}
									</p>

									<div
									className="mx-auto font-sans text-base antialiased font-light leading-relaxed text-inherit"
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
											(genre) => genre._id === genreId,
										);
										return genre ? (
											<Link
												to={`/genres/${genre._id}`}
												key={genre._id}
											>
												<a className="bg-gray-100 rounded-full px-3 py-1  font-semibold text-gray-600 text-xs italic ">
													<span className="m-2">
														#{genre.name}
													</span>
												</a>
											</Link>
										) : null;
									})}
								</div>
								</main>
								
								<footer className="flex items-center justify-between leading-none p-2 md:p-4">
									<a
										className="flex items-center no-underline hover:underline text-black"
										href="#"
									>
										{author ? (
											<Link
												to={`/author/${author._id}`}
												key={index}
											>
												<div className="flex">
													<img
														alt="Placeholder"
														className="block rounded-full w-8 h-8"
														src={author.image}
													/>
													<span className="bg-gray-100 rounded-full px-3 py-1  font-semibold text-gray-600 text-xs italic  w-fit p-1 text-xs italic rounded-md cursor-pointer m-1">
														<span className="ml-2 text-sm">
															@{author.name}
														</span>
													</span>
												</div>
											</Link>
										) : null}
									</a>
									<a
										className="no-underline text-grey-darker hover:text-red-dark"
										href="#"
									>
										<span className="hidden">Like</span>
										<i className="fa fa-heart"></i>
										<Link
											to={
												book.premium && !isPremiumUser()
													? '/pricing'
													: `/book/${book._id}`
											}
										>
											<button
												className={`align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ${
													book.premium &&
													!isPremiumUser()
														? 'disabled:opacity-50 bg-yellow-400 disabled:shadow-none disabled:pointer-events-none '
														: ''
												}`}
												type="button"
												disabled={
													book.premium &&
													!isPremiumUser()
												}
												onClick={handleClick}
											>
												{book.premium ? (
													<FontAwesomeIcon
														icon={faCrown}
													/>
												) : (
													'Đọc thêm'
												)}
											</button>
										</Link>
									</a>
								</footer>
							</article>
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
						onClick={handleNextPage}
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
			</div>
		</>
	);
}

export default CardsBooks;
