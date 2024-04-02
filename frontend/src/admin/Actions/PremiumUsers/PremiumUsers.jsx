import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import axios from '../../../config/axiosConfig';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal';

function ReadPremiumUser() {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				const premiumRes = await axios.get('/premium');
				const premiumData = premiumRes.data;

				const userRes = await axios.get('/user');
				const userData = userRes.data;

				const premiumWithNames = premiumData.map((premiumItem) => {
					const user = userData.find(
						(userItem) => userItem._id === premiumItem.userId,
					);
					const userName = user ? user.username : 'Unknown';
					return { ...premiumItem, userName };
				});

				setUsers(premiumWithNames);
			} catch (error) {
				console.error('Error fetching premium data:', error);
			}
		}

		fetchData();
	}, [isConfirmationOpen]);

	const handleDelete = (user) => {
		setSelectedUser(user);
		setIsConfirmationOpen(true);
	};

	const handleCloseConfirmation = () => {
		setSelectedUser(null);
		setIsConfirmationOpen(false);
	};

	const handleConfirmDelete = async () => {
		if (!selectedUser) return;

		try {
			await axios.delete(`/user/${selectedUser._id}`);
			toast.success('User deleted successfully');

			handleCloseConfirmation();
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	return (
		<section>
			<Link to={'/admin/user/add-user'}>
				<button
					type="button"
					className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
				>
					Add User
				</button>
			</Link>
			<div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
				<table className="w-full text-left table-auto min-w-max">
					<thead>
						<tr>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									#
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Tên người dùng
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Tiền thanh toán
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Trạng thái
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Gói đăng kí
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Thời gian đăng kí
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Thời gian hết hạn
								</p>
							</th>
							<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
								<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
									Hành động
								</p>
							</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr key={index}>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{index + 1}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{user && user.userName}
									</p>
								</td>

								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{user && user.money}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{user && user.status
											? 'Active'
											: 'Inactive'}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{user && user.package} Tháng
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{user &&
											moment(user.createAt)
												.tz('Asia/Ho_Chi_Minh')
												.format('YYYY-MM-DD HH:mm:ss')}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
										{user &&
											moment(user.expiryDate)
												.tz('Asia/Ho_Chi_Minh')
												.format('YYYY-MM-DD HH:mm:ss')}
									</p>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<Link
										to={`/admin/user/edit-user/${user._id}`}
									>
										<button
											type="button"
											className="text-white bg-blue-700 text-xs font-medium hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg px-2 py-2 me-1 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
										>
											<FontAwesomeIcon
												icon={faPenToSquare}
											/>
										</button>
									</Link>
									<button
										onClick={() => handleDelete(user)}
										className="text-white bg-red-700 text-xs font-medium hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-2 py-2 me-1 mb-2"
									>
										<FontAwesomeIcon icon={faTrash} />
									</button>

									<ConfirmationModal
										isOpen={isConfirmationOpen}
										onClose={handleCloseConfirmation}
										onConfirm={handleConfirmDelete}
										title="Confirm Delete User"
										content={`Are you sure you want to delete the user "${selectedUser?.username}"?`}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<ToastContainer />
		</section>
	);
}

export default ReadPremiumUser;
