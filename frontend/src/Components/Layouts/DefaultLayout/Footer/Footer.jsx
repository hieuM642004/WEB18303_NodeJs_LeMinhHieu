function Footer() {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="bg-white rounded-lg shadow-md mt-3 dark:bg-gray-800" >
			<div className="w-full shadow-md p-4 md:flex md:items-center md:justify-between">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
					© {currentYear}{' '}
					<a href="https://flowbite.com/" className="hover:underline">
						Hieu™
					</a>
					. All Rights Reserved.
				</span>
				<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
					<li>
						<a href="#" className="hover:underline me-4 md:me-6">
							Về chúng tôi
						</a>
					</li>
					<li>
						<a
							href="/contact"
							className="hover:underline me-4 md:me-6"
						>
							Liên hệ
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
