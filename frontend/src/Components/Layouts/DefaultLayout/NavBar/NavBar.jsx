import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../../assets/img/open-book.png';

import SearchBooks from './Search/Search';
import handleLogout from '../../../Logout/Logout';

function Navbar() {

	const [user, setUser] = useState();
	useEffect(() => {
		const userData = localStorage.getItem('user');
		if (userData) setUser(JSON.parse(userData));
	}, []);



	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md ">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 box-border">
				<Link
					to={'/'}
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<img src={logo} className="h-10" alt="Logo" />
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						BookWander
					</span>
				</Link>
				<div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
				<SearchBooks/>
					{user ? (
						<>
							<button
								type="button"
								className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
								id="user-menu-button"
								aria-expanded="false"
								data-dropdown-toggle="user-dropdown"
								data-dropdown-placement="bottom"
							>
								<span className="sr-only">Open user menu</span>
								<img
									className="w-8 h-8 rounded-full"
									src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
									alt="user photo"
								/>
							</button>
							{/* Dropdown menu */}
							<div
								className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
								id="user-dropdown"
							>
								<div className="px-4 py-3">
									<span className="block text-sm text-gray-900 dark:text-white">
										{user[0]}
									</span>
									<span className="block text-sm text-gray-500 truncate dark:text-gray-400">
										{user[1]}
									</span>
								</div>
								<ul
									className="py-2"
									aria-labelledby="user-menu-button"
								>
									<li>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											Dashboard
										</a>
									</li>
									
									<li>
										<button
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
											onClick={handleLogout}
										>
											Đăng xuất
										</button>
									</li>
								</ul>
							</div>
						</>
					) : (
						<>
							<button
								id="dropdownUserAvatarButton"
								data-dropdown-toggle="dropdownAvatar"
								className="flex shadow-md p-3 border-dark-400 text-xl rounded-full md:me-0  "
								type="button"
							>
								<span className="sr-only">Open user menu</span>
								<FontAwesomeIcon icon={faUser} />
							</button>

							<div
								id="dropdownAvatar"
								className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
							>
								<ul
									className="py-2 text-sm text-gray-700 dark:text-gray-200"
									aria-labelledby="dropdownUserAvatarButton"
								>
									<li>
										<Link to={'/login'}>
											<a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
												Đăng nhập
											</a>
										</Link>
									</li>
									<li>
										<Link to={'/register'}>
											{' '}
											<a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
												Đăng kí
											</a>
										</Link>
									</li>
								</ul>
							</div>
						</>
					)}
				</div>

				<div
					className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
					id="navbar-user"
				>
					<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<Link
								to="/"
								className="block py-2 px-3  bg-blue-700 rounded md:bg-transparent text-gray-900 md:p-0 "
							>
								Trang chủ
							</Link>
						</li>
						<li>
							<Link
								to="/contact"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Thể loại
							</Link>
						</li>
						<li>
							<Link
								to="/posts"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								Bài viết
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
