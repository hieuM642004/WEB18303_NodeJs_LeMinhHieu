import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../config/axiosConfig';

function Genres() {
	const { id } = useParams();
	const [genre, setGenre] = useState([]);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const genreResponse = await axios.get(`/genres/${id}`);
				setGenre(genreResponse.data);
				const booksResponse = await axios.get('/book');
				const matchedBooks = booksResponse.data.filter((book) =>
					book.genres.includes(id),
				);
				setBooks(matchedBooks);
			} catch (error) {
				console.log(error);
			}
		};
		fetchGenres();
	}, [id]);

	return (
		<section>
			<h2 className="flex flex-row flex-nowrap items-center my-8">
				<span
					className="flex-grow block border-t border-black"
					aria-hidden="true"
					role="presentation"
				></span>
				<span className="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
					{genre.name}
				</span>
				<span
					className="flex-grow block border-t border-black"
					aria-hidden="true"
					role="presentation"
				></span>
			</h2>

			<div className="grid grid-cols-3 gap-4">
				{books.map((book) => (
					<div
						key={book._id}
						className="relative grid  w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
					>
						<Link to={`/book/${book._id}`}>
							<div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
								<div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
							</div>
							<div className="relative p-6 px-6 py-14 md:px-12">
								<h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
									{book.name}
								</h2>
								<h5
									className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400"
									dangerouslySetInnerHTML={{
										__html:
											book.content.length > 100
												? book.content.substring(
														0,
														100,
												  ) + '...'
												: book.content,
									}}
								></h5>
								{/* <img alt={book.author} src={book.image} className="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center" /> */}
							</div>
						</Link>
					</div>
				))}
			</div>
		</section>
	);
}

export default Genres;
