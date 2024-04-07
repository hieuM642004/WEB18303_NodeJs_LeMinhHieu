import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import CardsBooks from '../CardsBooks/CarsBooks';

function Genres() {
	const { id: genreId } = useParams();
	const [genre, setGenre] = useState({});

	useEffect(() => {
		const fetchGenresAndBooks = async () => {
			try {
				const genreResponse = await axios.get(`/genres/${genreId}`);
				setGenre(genreResponse.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchGenresAndBooks();
	}, [genreId]);

	return (
		<section className='w-full'>
			<h2 className="flex flex-row flex-nowrap items-center my-8">
				<span
					className="flex-grow block border-t border-black"
					aria-hidden="true"
					role="presentation"
				></span>
				<span className="flex-none block mx-4 px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
					{genre.name}
				</span>
				<span
					className="flex-grow block border-t border-black"
					aria-hidden="true"
					role="presentation"
				></span>
			</h2>
			<CardsBooks genreId={genreId} />
		</section>
	);
}

export default Genres;
