import { useState } from "react";
import { createPost } from "../services/api";

const PostForm = ({ onPostCreated }) => {
    const [post, setPost] = useState({ author: "", title: "", content: "", cover: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await createPost(post);
        if (result.error) {
            setError(result.error);
        } else {
            setPost({ author: "", title: "", content: "", cover: "" });
            onPostCreated();
        }
    };

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">Create Post</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="author" placeholder="Author" value={post.author} onChange={handleChange} required className="border p-2 rounded" />
                <input name="title" placeholder="Title" value={post.title} onChange={handleChange} required className="border p-2 rounded" />
                <textarea name="content" placeholder="Content" value={post.content} onChange={handleChange} required className="border p-2 rounded" />
                <input name="cover" placeholder="Cover URL" value={post.cover} onChange={handleChange} required className="border p-2 rounded" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
            </form>
        </div>
    );
};

export default PostForm;