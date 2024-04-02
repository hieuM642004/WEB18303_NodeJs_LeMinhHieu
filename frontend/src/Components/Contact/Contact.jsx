import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';
import { Link } from 'react-router-dom';
const Contact = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const getAuthors = async () => {
            try {
                const resAuthors = await axios.get('/author');
                setAuthors(resAuthors.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAuthors();
    }, []);

	return (
		<div className="grid grid-cols-4 gap-4 ">
			{authors &&
				authors.map((author, index) => (
					<div className="h-screen  pt-12" key={index}>
						<div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
							<div className="border-b px-4 pb-6">
								<div className="text-center my-4">
									<img
										className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
										src={author && author.image}
										alt=""
									/>
									<div className="py-2">
										<h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
											{author && author.name}
										</h3>
							
									</div>
								</div>
								<div className="flex justify-center px-2">
									<Link to={`/author/${author._id}`}>
									    <button className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
    										Xem chi tiết
    									</button>
									</Link>
								</div>
							</div>
							<div className="px-4 py-4">
								<div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
								<img width="25" height="25" src="https://img.icons8.com/ios/50/book--v1.png" alt="book--v1"/>
									<span>
										<strong className="text-black dark:text-white">
											{author && author.books.length}
										</strong>{' '}
										Đã xuất bản
									</span>
								</div>
								<div className="flex">
									<div className="flex justify-end mr-2">
										<img
											className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
											src="https://randomuser.me/api/portraits/men/32.jpg"
											alt=""
										/>
										<img
											className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
											src="https://randomuser.me/api/portraits/women/31.jpg"
											alt=""
										/>
										<img
											className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
											src="https://randomuser.me/api/portraits/men/33.jpg"
											alt=""
										/>
										<img
											className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
											src="https://randomuser.me/api/portraits/women/32.jpg"
											alt=""
										/>
										<img
											className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
											src="https://randomuser.me/api/portraits/men/44.jpg"
											alt=""
										/>
										<img
											className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
											src="https://randomuser.me/api/portraits/women/42.jpg"
											alt=""
										/>
										<span className="flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full h-10 w-10">
											+999
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default Contact;
