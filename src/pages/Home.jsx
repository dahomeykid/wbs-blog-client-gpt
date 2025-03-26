import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${API_URL}/posts`).then((res) => setPosts(res.data));
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
            {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded my-2">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
            <Link to="/create" className="block mt-4 text-blue-500">Create a Post</Link>
        </div>
    );
}

export default Home;