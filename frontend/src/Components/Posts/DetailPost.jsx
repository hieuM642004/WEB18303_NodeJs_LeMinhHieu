import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axiosConfig';

function DetailPosts() {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [user, setUser] = useState(null);
	useEffect(() => {
		const fetchPostAndGenre = async () => {
			try {
				const postsResponse = await axios.get(`/posts/${id}`);
				setPost(postsResponse.data);

				// const userResponse = await axios.get(`/user`);
				// setUser(userResponse.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchPostAndGenre();
	}, [id]);

	return (
		<section>
			<div className="max-w-screen-xl mx-auto p-5 sm:p-8 md:p-12 relative">
				<div
					className="bg-cover h-64 text-center overflow-hidden"
					style={{
						height: '450px',
						backgroundImage: post ? `url(${post.image})` : 'none',
					}}
				></div>
				<div className="max-w-2xl mx-auto">
					<div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
						<div className="">
							<a
								href="#"
								className="text-xs text-indigo-600 uppercase font-medium hover:text-gray-900 transition duration-500 ease-in-out"
							>
								Election
							</a>
							<a
								href="#"
								className="text-xs text-indigo-600 uppercase font-medium hover:text-gray-900 transition duration-500 ease-in-out"
							>
								Politics
							</a>

							{post && post.title && (
								<h1
									href="#"
									className="text-gray-900 font-bold text-3xl mb-2"
								>
									{post.title}{' '}
								</h1>
							)}
							<p className="text-gray-700 text-xs mt-2">
								Written By:
								{/* {post.userId.map((userId) => {
									const userInfo = user.find(
										(user) => user._id === userId,
									);

									return (
										userInfo && (
											<a
												key={userId}
												href="#"
												className="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
											>
												{userInfo.username}
											</a>
										)
									);
								})} */}
							</p>

							{post && post.content && (
								<p className="text-base leading-8 my-5">
									{post.content}
								</p>
							)}
							<h3 className="text-2xl font-bold my-5">
								#1. What is Lorem Ipsum?
							</h3>
							<p className="text-base leading-8 my-5">
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the standard dummy text ever since the 1500s,
								when an unknown printer took a galley of type
								and scrambled it to make a type specimen book.
								It has survived not only five centuries, but
								also the leap into electronic typesetting,
								remaining essentially unchanged. It was
								popularised in the 1960s with the release of
								Letraset sheets containing Lorem Ipsum passages,
								and more recently with desktop publishing
								software like Aldus PageMaker including versions
								of Lorem Ipsum.
							</p>
							<blockquote className="border-l-4 text-base italic leading-8 my-5 p-5 text-indigo-600">
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the standard dummy text ever since the 1500s
							</blockquote>
							<p className="text-base leading-8 my-5">
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the standard dummy text ever since the 1500s,
								when an unknown printer took a galley of type
								and scrambled it to make a type specimen book.
								It has survived not only five centuries, but
								also the leap into electronic typesetting,
								remaining essentially unchanged. It was
								popularised in the 1960s with the release of
								Letraset sheets containing Lorem Ipsum passages,
								and more recently with desktop publishing
								software like Aldus PageMaker including versions
								of Lorem Ipsum.
							</p>
							<div>
								<a
									href="#"
									className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
								>
									#Election
								</a>
								<a
									href="#"
									className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
								>
									#people
								</a>
								<a
									href="#"
									className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
								>
									#Election2020
								</a>
								<a
									href="#"
									className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
								>
									#trump
								</a>
								<a
									href="#"
									className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
								>
									#Joe
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default DetailPosts;
