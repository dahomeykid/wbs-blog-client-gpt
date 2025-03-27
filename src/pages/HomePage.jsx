import { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPosts = async () => {
            const data = await fetchPosts();
            if (data.error) {
                setError(data.error);
            } else {
                setPosts(data);
            }
        };

        loadPosts();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-6">Latest Posts</h1>

            {error && (
                <div className="text-red-600 bg-red-100 p-4 rounded border border-red-300 text-center mb-4">
                    {error}
                </div>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                        <img src={post.cover} alt={post.title} className="w-full h-40 object-cover rounded-md mb-3" />
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-gray-600 text-sm">{post.content.substring(0, 100)}...</p>
                        <Link to={`/posts/${post.id}`} className="text-blue-500 font-medium mt-2 inline-block">
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;