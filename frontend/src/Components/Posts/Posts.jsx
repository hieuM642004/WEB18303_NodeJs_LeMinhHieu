import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axiosConfig';

function Posts() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/posts`);
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
    }, []);
	return (
        <article>
            <div className="flex flex-col p-5 lg:px-48 lg:py-11">
                {posts &&
                    posts.map((post, index) => {
                        const {_id, title, content, image } = post;
                        return (
                            <div className="bg-gray-100 p-5 mb-10 rounded-md shadow-md" key={index}>
                                <h1 className="font-bold text-2xl mb-2">{title}</h1>
                              <div className='flex mb-2 flex-col md:flex-row'>
                                    <img src={image} className='w-60 ' alt="" />
                                    <p className="my-3 ml-2">
                                        {content}
                                    </p>
                              </div>
                               <Link to={`/posts/${_id}`}>
                                    <button className="text-white font-semibold bg-dark-600 hover:bg-blue-gray-700 p-2 my-1 rounded">
                                        Xem thêm...
                                    </button>
                               </Link>
                            </div>
                        );
                    })
                }
            </div>
        </article>
    );
}

export default Posts;
