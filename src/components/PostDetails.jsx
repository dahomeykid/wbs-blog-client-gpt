import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById, deletePost } from "../services/api";

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPost = async () => {
            setError("");
            const data = await fetchPostById(id);
            if (!data) setError("Post not found");
            setPost(data);
        };
        loadPost();
    }, [id]);

    const handleDelete = async () => {
        const result = await deletePost(id);
        if (result.error) {
            alert(result.error);
        } else {
            alert("Post deleted successfully!");
            navigate("/");
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!post) return <p>Loading...</p>;

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">By {post.author}</p>
            <img src={post.cover} alt="Cover" className="w-full h-60 object-cover my-3 rounded" />
            <p className="mt-2">{post.content}</p>
            
            <div className="mt-4 flex gap-3">
                <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete Post</button>
                <Link to={`/posts/${id}/edit`} className="bg-green-500 text-white p-2 rounded">Edit Post</Link>
                <button onClick={() => navigate("/")} className="bg-gray-500 text-white p-2 rounded">Back</button>
            </div>
        </div>
    );
};

export default PostDetails;