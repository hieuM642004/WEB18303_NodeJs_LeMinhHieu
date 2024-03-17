import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
function Author() {
	const { id } = useParams();
	const [author, setAuthor] = useState(null);
	const [follow, setFollow] = useState(false);
	useEffect(() => {
		const fetchAuthor = async () => {
			try {
				const response = await axios.get(`/author/${id}`);
				setAuthor(response.data);
				const user = localStorage.getItem('user');
				const useId = JSON.parse(user)[0];
				const responseUser = await axios.get(`/user/${useId}`);
				const hasFollowIds = responseUser.data.hasFollow;
				if (hasFollowIds.includes(id)) {
					setFollow(true);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchAuthor();
	}, [id]);

	const handleFollow = async () => {
		setFollow(!follow);
		try {
			const user = localStorage.getItem('user');

			const dataUsser = JSON.parse(user);
			const userId = dataUsser[0];
			if (userId) {
				const response = await axios.post(`/user/${userId}`, {
					hasFollow: id,
				});
				console.table(response);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="bg-gray-100">
			<div className="container mx-auto py-8">
				{author && (
					<div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
						<div className="col-span-4 sm:col-span-3">
							<div className="bg-white shadow rounded-lg p-6">
								<div className="flex flex-col items-center">
									<img
										src="https://randomuser.me/api/portraits/men/94.jpg"
										className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
										alt="Author Avatar"
									/>
									<h1 className="text-xl font-bold">
										{author.name}
									</h1>
									{/* <p className="text-gray-700">{author.job}</p> */}
									<div className="mt-6 flex flex-wrap gap-4 justify-center">
										<button
											onClick={handleFollow}
											type="button"
											className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
										>
											{follow ? (
												'Đang theo dõi'
											) : (
												<FontAwesomeIcon
													icon={faPlus}
												/>
											)}
										</button>
									</div>
								</div>
								<div className="flex flex-col mt-3">
									<span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
										Thông tin
									</span>
									<ul>
										<li>Năm sinh: {author.year}</li>
										<li> {author.description}</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-span-4 sm:col-span-9">
							<div className="bg-white shadow rounded-lg p-6">
								<h2 className="text-xl font-medium mt-3 mb-4">
									Sách đã xuất bản bởi{' '}
									<span className="text-xl font-bold">
										{author.name}
									</span>
								</h2>
								<div className="grid ">
									{author.books.map((book, index) => (
										<div
											key={index}
											className="relative  flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 "
										>
											<div className="p-6 ">
												<h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
													{book.name}
												</h5>
												{/* Other book details */}
												<Link to={`/book/${book._id}`}>
													<button
														className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
														type="button"
													>
														Đọc thêm
													</button>
												</Link>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Author;
