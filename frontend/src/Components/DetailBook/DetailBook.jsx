import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import { useSpeechSynthesis } from 'react-speech-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons';
function DetailBook() {
	const { id } = useParams();
	const [book, setBook] = useState({});
	const [genres, setGenres] = useState([]);
	const [textToSpeak, setTextToSpeak] = useState('');
	const [isSpeaking, setIsSpeaking] = useState(false);
	const { speak, cancel } = useSpeechSynthesis();

	const handleSpeak = () => {
		if (isSpeaking) {
			cancel();
			setIsSpeaking(false);
		} else {
			if (textToSpeak) {
				const availableVoices = window.speechSynthesis.getVoices();
				console.log(availableVoices);
				const selectedVoice = availableVoices.find(
					(voice) => voice.lang === 'vi-VN',
				);
				speak({
					text: textToSpeak,
					lang: 'vi-VN',
					voice: selectedVoice,
				});
				setIsSpeaking(true);
			}
		}
	};
	useEffect(() => {
		const fetchBookAndGenres = async () => {
			try {
				const bookResponse = await axios.get(`/book/${id}`);
				setBook(bookResponse.data);
				const contentText = extractTextFromHTML(
					bookResponse.data.content,
				);
				setTextToSpeak(contentText);
				const genresResponse = await axios.get(`/genres`);
				const allGenres = genresResponse.data;

				const matchedGenres = allGenres.filter((genre) =>
					bookResponse.data.genres.includes(genre._id),
				);

				setGenres(matchedGenres);
			} catch (error) {
				console.error('Error fetching book data:', error);
			}
		};

		fetchBookAndGenres();
	}, [id]);
	const extractTextFromHTML = (html) => {
		const tmp = document.createElement('div');
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || '';
	};
	return (
		<div className="mt-3   shadow-md w-full rounded-md">
			<div></div>
			<i className="ml-40 text-sm italic">
				Xuất bản: {book && book.publishedDate}
			</i>
			<Link to={`/author/${book && book?.author?._id}`}>
				<div className="ml-40 flex items-center mt-3 ">
					<img
						className=" w-10 h-10 rounded-full"
						src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
						alt="Rounded avatar"
					></img>

					<span className="ml-1">
						<p className="text-sm text-gray-500">Tác giả</p>@
						{book && book?.author?.name}
					</span>
				</div>
				<h1 className="text-center text-4xl text-gray-900 dark:text-white mb-3">
					{book && book.name}
				</h1>
			</Link>
			<hr className="w-3/4 mx-auto" />
			<div className="flex flex-col items-center">
				<figure className="max-w-lg mt-3 mb-3">
					{book.images &&
						book.images.map((imageUrl, imageIndex) => (
							<div key={imageIndex}>
								<img
									className="h-80 max-w-full rounded-lg"
									src={imageUrl}
									alt={`book-image-${imageIndex}`}
								/>
							</div>
						))}
					<figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
						Image caption
					</figcaption>
				</figure>

				<div
					className="w-3/4 mt-2 mb-2"
					dangerouslySetInnerHTML={{ __html: book && book.content }}
				></div>
				<button
					onClick={handleSpeak}
					className="fixed right-20 rounded-full p-3 text-white top-96 bg-deep-orange-500"
				>
					{isSpeaking ? <FontAwesomeIcon icon={faPause} /> : 'Đọc'}
				</button>
			</div>
			<hr className="w-3/4 mx-auto" />

			<div className=" flex items-center justify-center mt-2">
				<div className="bg-gray-100 w-full   rounded-xl md:w-1/2 lg:w-1/3">
					<div className="flex justify-around my-2">
						<p className="text-sm ml-3">Chia sẻ</p>

						<div className="border hover:bg-[#1d9bf0] w-7 h-7 fill-[#1d9bf0] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
							</svg>
						</div>

						<div className="border hover:bg-[#bc2a8d] w-7 h-7 fill-[#bc2a8d] hover:fill-white border-pink-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-pink-500/50 cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
								<circle
									cx="16.806"
									cy="7.207"
									r="1.078"
								></circle>
								<path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
							</svg>
						</div>

						<div className="border hover:bg-[#25D366] w-7 h-7 fill-[#25D366] hover:fill-white border-green-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-green-500/50 cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
								></path>
							</svg>
						</div>

						<div className="border hover:bg-[#229ED9] w-7 h-7 fill-[#229ED9] hover:fill-white border-sky-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
							</svg>
						</div>
					</div>
				</div>
				<div className=" text-gray-800 text-xs font-medium m-3 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
					{genres &&
						genres.map((genre, index) => (
							<span key={index}>
								<Link to={`/genres/${genre._id}`}>
									<span
										key={genre.id}
										className="rounded-md shadow-md p-3 m-3 bg-gray-100"
									>
										#{genre.name}
									</span>
								</Link>
							</span>
						))}
				</div>
			</div>

			<section className="bg-white dark:bg-gray-900 py-2 lg:py-16 antialiased">
				<div className="max-w-2xl mx-auto px-4">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
							Bình luận (4)
						</h2>
					</div>
					<form className="mb-6">
						<div className="flex items-center mb-2">
							<svg
								className="w-4 h-4 text-yellow-300 me-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className="w-4 h-4 text-yellow-300 me-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className="w-4 h-4 text-yellow-300 me-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className="w-4 h-4 text-yellow-300 me-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
						</div>
						<div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
							<label for="comment" className="sr-only">
								Bình luận của bạn
							</label>

							<textarea
								id="comment"
								rows="6"
								className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
								placeholder="Viết nội dung..."
								required
							></textarea>
						</div>
						<button
							type="submit"
							className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-gray-300"
						>
							Gửi
						</button>
					</form>
					<article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
						<footer className="flex justify-between items-center mb-2">
							<div className="flex items-center">
								<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
									<img
										className="mr-2 w-6 h-6 rounded-full"
										src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
										alt="Michael Gough"
									/>
									Michael
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									<time
										pubdate
										datetime="2022-02-08"
										title="February 8th, 2022"
									>
										Feb. 8, 2022
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
							<svg
								className="w-4 h-4 text-yellow-300 me-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className="w-4 h-4 text-yellow-300 me-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className="w-4 h-4 text-yellow-300 me-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className="w-4 h-4 text-yellow-300 me-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
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
							Hay quá
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
								<span className="sr-only">
									Comment settings
								</span>
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
					<article className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
						<footer className="flex justify-between items-center mb-2">
							<div className="flex items-center">
								<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
									<img
										className="mr-2 w-6 h-6 rounded-full"
										src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
										alt="Bonnie Green"
									/>
									Bonnie Green
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									<time
										pubdate
										datetime="2022-03-12"
										title="March 12th, 2022"
									>
										Mar. 12, 2022
									</time>
								</p>
							</div>
							<button
								id="dropdownComment3Button"
								data-dropdown-toggle="dropdownComment3"
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
								<span className="sr-only">
									Comment settings
								</span>
							</button>

							<div
								id="dropdownComment3"
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
							Tuyệt
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
					<article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
						<footer className="flex justify-between items-center mb-2">
							<div className="flex items-center">
								<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
									<img
										className="mr-2 w-6 h-6 rounded-full"
										src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
										alt="Helene Engels"
									/>
									Helene Engels
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									<time
										pubdate
										datetime="2022-06-23"
										title="June 23rd, 2022"
									>
										Jun. 23, 2022
									</time>
								</p>
							</div>
							<button
								id="dropdownComment4Button"
								data-dropdown-toggle="dropdownComment4"
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
							</button>

							<div
								id="dropdownComment4"
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
							Không tệ
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
		</div>
	);
}

export default DetailBook;
