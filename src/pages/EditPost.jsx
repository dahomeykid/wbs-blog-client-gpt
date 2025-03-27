import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById, updatePost } from "../services/api";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ author: "", title: "", content: "", cover: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPost = async () => {
            const data = await fetchPostById(id);
            if (!data) {
                setError("Post not found");
                return;
            }
            setPost(data);
        };
        loadPost();
    }, [id]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await updatePost(id, post);
        if (result.error) {
            setError(result.error);
        } else {
            navigate(`/posts/${id}`);
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!post.title) return <p>Loading...</p>;

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">Edit Post</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="author" value={post.author} onChange={handleChange} required className="border p-2 rounded" />
                <input name="title" value={post.title} onChange={handleChange} required className="border p-2 rounded" />
                <textarea name="content" value={post.content} onChange={handleChange} required className="border p-2 rounded" />
                <input name="cover" value={post.cover} onChange={handleChange} required className="border p-2 rounded" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Post</button>
                <button type="button" onClick={() => navigate(`/posts/${id}`)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
            </form>
        </div>
    );
};

export default EditPost;