import React, { useState, useEffect, useRef } from 'react';
import axios from '../../../../../config/axiosConfig';
import { Link } from 'react-router-dom';

const SearchBooks = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const inputRef = useRef(null);

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
		setShowSuggestions(true);
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (inputRef.current && !inputRef.current.contains(e.target)) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			try {
				const response = await axios.get(`/book?search=${searchTerm}`);

				setSearchResults(response.data);

				onSearch(response.data);
			} catch (error) {
				console.error('Error searching books:', error);
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);
	const highlightMatches = (text, match) => {
		const parts = text.split(new RegExp(`(${match})`, 'gi'));
		return parts.map((part, index) => (
			<span
				key={index}
				className={
					part.toLowerCase() === match.toLowerCase()
						? 'font-bold'
						: ''
				}
			>
				{part}
			</span>
		));
	};
	return (
		<div ref={inputRef}>
			<form className="mr-5 my-3 relative">
				<label
					htmlFor="default-search"
					className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
				>
					Search
				</label>
				<div className="relative">
					<input
						type="search"
						id="default-search"
						value={searchTerm}
						onChange={handleChange}
						className="items-center w-full shadow-md text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Tìm kiếm..."
						required
						autoComplete='off'
					/>
				</div>
				{showSuggestions && (
					<div className="absolute">
						<ul className="bg-white border border-gray-100 w-full mt-2 rounded-md shadow-md">
							{searchResults.map((book) => (
								<div key={book._id}>
									<Link to={`/book/${book._id}`}>
										<li className="rounded-md text-center min-w-48  py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-blue-gray-50 hover:text-gray-900">
											{highlightMatches(
												book.name,
												searchTerm,
											)}
										</li>
									</Link>
								</div>
							))}
						</ul>
					</div>
				)}
			</form>
		</div>
	);
};

export default SearchBooks;
