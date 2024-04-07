import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../config/axiosConfig';
import PaymentForm from './Payments';
import getUsersFromLocalStorage from '../../utils/getDataUser';

function PricingCard() {
	
	const [userPackage, setUserPackage] = useState([]);

	useEffect(() => {
		const fetchUserPackage = async () => {
			try {
				const response = await axios.get('/premium');

				const filterHasRegister = response.data.find(
					(pre) => pre.userId === getUsersFromLocalStorage()[0],
				);
				if (filterHasRegister) {
					setUserPackage(filterHasRegister);
				}
			} catch (error) {
				console.error('Error fetching user package:', error);
			}
		};

		fetchUserPackage();
	}, []);

	const handleRegisterPremiumAccount = async (money, packageType) => {
		try {
			const userId = getUsersFromLocalStorage()[0];

			await axios.post('/premium/register', {
				userId,
				money,
				packageType,
			});
			setTimeout(() => {
				
				alert('Đăng kí thành công');
				window.location.href='/'
			}, 1000);
		} catch (error) {
			console.error('Đã xảy ra lỗi khi đăng ký:', error);
		}
	};

	return (
		<section className="bg-white dark:bg-gray-900 ">
			{/* <PaymentForm /> */}

			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
						Đăng kí để trải nghiệm những quyển sách độc quyền
					</h2>
					<p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
						Hãy chọn gói phù hợp với bạn.
					</p>
				</div>
				<div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
					<div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
						<h3 className="mb-4 text-2xl font-semibold">1 Tháng</h3>
						<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
							Lựa chọn phù hợp để thử dịch vụ của chúng tôi.
						</p>
						<div className="flex justify-center items-baseline my-8">
							<span className="mr-2 text-5xl font-extrabold">
								50.000đ
							</span>
							<span className="text-gray-500 dark:text-gray-400">
								/tháng
							</span>
						</div>

						<ul role="list" className="mb-8 space-y-4 text-left">
							<li className="flex items-center space-x-3">
								<svg
									className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									></path>
								</svg>
								<span>
									Đọc sách giới hạn 5 quyển sách premium
								</span>
							</li>
						</ul>
						<button
							disabled={userPackage && userPackage.package === 1}
							onClick={() =>
								handleRegisterPremiumAccount(50000, 1)
							}
							className={`text-white bg-dark-600 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900 ${
								userPackage && userPackage.package === 1
									? 'opacity-50 cursor-not-allowed'
									: ''
							}`}
						>
							{userPackage && userPackage.package === 1
								? 'Đã đăng kí'
								: 'Đăng kí'}
						</button>
					</div>

					<div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
						<h3 className="mb-4 text-2xl font-semibold">3 Tháng</h3>
						<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
							Tối ưu chi phí cho người mới sử dụng.
						</p>
						<div className="flex justify-center items-baseline my-8">
							<span className="mr-2 text-5xl font-extrabold">
								150.000đ
							</span>
							<span className="text-gray-500 dark:text-gray-400">
								/tháng
							</span>
						</div>

						<ul role="list" className="mb-8 space-y-4 text-left">
							<li className="flex items-center space-x-3">
								<svg
									className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									></path>
								</svg>
								<span>
									Đọc sách giới hạn 5 quyển sách premium
								</span>
							</li>
						</ul>
						<button
							disabled={userPackage && userPackage.package === 3}
							onClick={() =>
								handleRegisterPremiumAccount(150000, 3)
							}
							className={`text-white bg-dark-600 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900 ${
								userPackage && userPackage.package === 3
									? 'opacity-50 cursor-not-allowed'
									: ''
							}`}
						>
							{userPackage && userPackage.package === 3
								? 'Đã đăng kí'
								: 'Đăng kí'}
						</button>
					</div>

					<div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white  rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
						<h3 className="mb-4 text-2xl font-semibold">1 Năm</h3>
						<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
							Tối ưu chi phí dịch vụ khi bạn lựa chọn.
						</p>
						<div className="flex justify-center items-baseline my-8">
							<span className="mr-2 text-5xl font-extrabold">
								500.000đ
							</span>
							<span className="text-gray-500 dark:text-gray-400">
								/month
							</span>
						</div>

						<ul role="list" className="mb-8 space-y-4 text-left">
							<li className="flex items-center space-x-3">
								<svg
									className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									></path>
								</svg>
								<span>
									Đọc sách giới hạn 5 quyển sách premium
								</span>
							</li>
						</ul>
						<button
							disabled={userPackage && userPackage.package === 12}
							onClick={() =>
								handleRegisterPremiumAccount(500000, 12)
							}
							className={`text-white bg-dark-600 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900 ${
								userPackage && userPackage.package === 12
									? 'opacity-50 cursor-not-allowed'
									: ''
							}`}
						>
							{userPackage && userPackage.package === 12
								? 'Đã đăng kí'
								: 'Đăng kí'}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default PricingCard;
