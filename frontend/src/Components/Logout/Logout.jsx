import axios from "../../config/axiosConfig";


    const handleLogout = async () => {
		try {
			const token = document.cookie
				.split('; ')
				.find((row) => row.startsWith('token='))
				.split('=')[1];

			await axios.post('/auth/logout', null, {
				headers: {
					token: `Bearer ${token}`,
				},
			});

			document.cookie =
				'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			localStorage.removeItem('user');
			window.location.href = '/';
		} catch (error) {
			console.error('Đã xảy ra lỗi khi đăng xuất:', error);
		}
	};
  


export default handleLogout;