import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById } from "../services/api";

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPost = async () => {
            const data = await fetchPostById(id);
            if (data.error) {
                setError(data.error);
            } else {
                setPost(data);
            }
        };

        loadPost();
    }, [id]);

    if (error) {
        return <div className="text-red-500 text-center py-4">{error}</div>;
    }

    if (!post) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <img src={post.cover} alt={post.title} className="w-full h-60 object-cover rounded-md mb-4" />
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-600 mt-2">By {post.author} | {new Date(post.created_at).toLocaleDateString()}</p>
            <p className="mt-4">{post.content}</p>
            <Link to="/" className="text-blue-500 mt-4 inline-block">← Back to Home</Link>
        </div>
    );
};

export default PostDetails;
