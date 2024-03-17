import { Link } from 'react-router-dom';
import axios from '../../config/axiosConfig';

import './home.css';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {io} from 'socket.io-client'
// const socket=io('http://localhost:9000',{
// 	reconnection:true
// })
const HomePage = () => {
	// useEffect(()=>{
	// 	console.log("SOCKET IO",socket);
	// 		},[])
	const [books, setBooks] = useState([]);
	const [genres, setGenres] = useState([]);
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		const fetchBooksAndGenres = async () => {
			try {
				const booksResponse = await axios.get('/book');
				const genresResponse = await axios.get('/genres');
				const authorsResponse = await axios.get('/author');
				setBooks(booksResponse.data);
				setGenres(genresResponse.data);
				setAuthors(authorsResponse.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchBooksAndGenres();
	}, []);
	const handleClick = (event) => {
		if (event.currentTarget.disabled) {
			event.preventDefault(); 
			event
		}
	};
	return (
		<section className="mt-2">
			<div className="   banner mb-3 rounded-md">
				<div className="md:w-1/2">
					{/* <p className="font-bold text-sm uppercase">Sách mới</p>
					<p className="text-3xl font-bold">Multimedia</p>
					<p className="text-2xl mb-10 leading-none">
						Xuất bản ngày 09/3
					</p>
					<button
						className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
						type="button"
					>
						Xem ngay
					</button> */}
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4">
				{books.map((book, index) => {
					const author = authors.find(
						(author) => author._id === book.author,
					);

					return (
						<div
							key={index}
							className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
						>
							
							<div className=" mx-auto">
								{book.images &&
									book.images.map((imageUrl, imageIndex) => (
										<div key={imageIndex}>
											<img
												src={imageUrl}
												alt={`book-image-${imageIndex}`}
												className='w-50'
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
												>
													<a
														className="bg-blue-gray-100 w-fit p-1 text-xs italic rounded-md cursor-pointer m-1"
														key={genre._id}
													>
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
											<Link to={`/author/${author._id}`}>
												<span
													className="bg-blue-gray-100 w-fit p-1 text-xs italic rounded-md cursor-pointer m-1"
													key={index}
												>
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
								<Link to={book.premium ? "/pricing" : `/book/${book._id}`}   style={{ cursor: book.premium ? 'none' : 'pointer' }}>
									<button
										className={`align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ${
											book.premium
												? 'disabled:opacity-50 bg-yellow-400 disabled:shadow-none disabled:pointer-events-none cursor-none'
												: ''
										}`}
										type="button"
										disabled={book.premium}
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
		</section>
	);
};

export default HomePage;
