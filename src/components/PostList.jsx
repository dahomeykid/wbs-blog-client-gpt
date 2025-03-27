import { useEffect, useState } from "react";
import { fetchPosts, deletePost } from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    const loadPosts = async () => {
        const data = await fetchPosts();
        if (data.error) {
            setError(data.error); // Display the error from API
            toast.error(data.error); // Display Toast notification 
        } else {
            setPosts(data);
        }
    };

    const handleDelete = async (id) => {
        const result = await deletePost(id);
        if (result.error) {
            toast.error(result.error); // Show error toast on deletion failure
        } else {
            setPosts(posts.filter(post => post.id !== id));
            toast.success("Post deleted successfully!");
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Posts</h2>
            {error && (
                <div className="text-red-500 bg-red-100 p-4 mb-3 border border-red-300 rounded">
                    <p>{error}</p>
                </div>
            )}
            <ul>
                {posts.map(post => (
                    <li key={post.id} className="border p-3 my-2 rounded shadow">
                        <Link to={`/posts/${post.id}`} className="text-blue-500 font-bold hover:underline">
                            {post.title}
                        </Link>
                        <p>{post.content.substring(0, 100)}...</p>
                        <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white p-1 rounded mt-2">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;