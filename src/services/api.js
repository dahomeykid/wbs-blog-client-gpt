const API_URL = import.meta.env.VITE_API_URL;

// 📌 Get all posts
export const fetchPosts = async () => {
    try {
        const response = await fetch(`${API_URL}/posts`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return [];
    }
};

// 📌 Get a single post by ID
export const fetchPostById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`);
        if (!response.ok) throw new Error("Post not found");
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

// 📌 Create a new post
export const createPost = async (postData) => {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.errors ? data.errors[0].msg : "Failed to create post");
        return data;
    } catch (error) {
        console.error(error.message);
        return { error: error.message };
    }
};

// 📌 Update a post
export const updatePost = async (id, updatedData) => {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.errors ? data.errors[0].msg : "Failed to update post");
        return data;
    } catch (error) {
        console.error(error.message);
        return { error: error.message };
    }
};

// 📌 Delete a post
export const deletePost = async (id) => {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to delete post");
        return data;
    } catch (error) {
        console.error(error.message);
        return { error: error.message };
    }
};