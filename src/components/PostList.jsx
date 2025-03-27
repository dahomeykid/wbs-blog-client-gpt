import { useEffect, useState } from "react";
import { fetchPosts, deletePost } from "../services/api";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    const loadPosts = async () => {
        setError("");
        const data = await fetchPosts();
        if (data.length === 0) setError("No posts found or server error.");
        setPosts(data);
    };

    const handleDelete = async (id) => {
        const result = await deletePost(id);
        if (result.error) {
            alert(result.error);
        } else {
            setPosts(posts.filter(post => post.id !== id));
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Posts</h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul>
                {posts.map(post => (
                    <li key={post.id} className="border p-3 my-2 rounded shadow">
                        <h3 className="font-bold">{post.title}</h3>
                        <p>{post.content}</p>
                        <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white p-1 rounded mt-2">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;