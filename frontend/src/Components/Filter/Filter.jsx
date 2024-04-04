import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';
import { Link } from 'react-router-dom';
function Filter() {
	const [genres, setGenres] = useState([]);
	useEffect(() => {
		const getGenres = async () => {
			try {
				const res = await axios.get('/genres');
				setGenres(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getGenres();
	}, []);
	const randomClasses = [
		'text-3xl text-cyan-500',
		'text-xl text-teal-500',
		'text-md text-red-500',
		'text-lg text-green-500',
		'text-sm text-orange-500',
		'text-3xl text-cyan-500',
		'text-md text-blue-500',
		'text-2xl text-indigo-500',
		'text-xl text-indigo-500',
		'text-md text-blue-500',
		'text-xs text-cyan-500',
		'text-4xl text-red-500',
		'text-lg text-gray-500',
		'text-3xl text-cyan-500',
		'text-md text-blue-500',
		'text-4xl text-red-500',
		'text-lg text-gray-500',
		'text-sm text-orange-500',
	];
	const getRandomClass = () => {
		const randomIndex = Math.floor(Math.random() * randomClasses.length);
		return randomClasses[randomIndex];
	};
	return (
		<ul className="flex mx-auto justify-center flex-wrap max-w-xl align-center gap-2 leading-8">
			{genres.map((genre, index) => (
				<Link to={`/genres/${genre._id}`} key={index}>
					{' '}  
					<li>
						<a className={getRandomClass()}>
							{genre && genre.name}
						</a>
					</li>
				</Link>
			))}
		</ul>
	);
}

export default Filter;
