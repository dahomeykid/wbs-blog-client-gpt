import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/api";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { title, content, cover, author };
        const response = await createPost(newPost);

        if (response.error) {
            alert(response.error);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Author" className="w-full p-2 border rounded" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="text" placeholder="Title" className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Cover Image URL" className="w-full p-2 border rounded" value={cover} onChange={(e) => setCover(e.target.value)} required />
                <textarea placeholder="Content" className="w-full p-2 border rounded" value={content} onChange={(e) => setContent(e.target.value)} required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
                    Publish Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;