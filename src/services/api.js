const API_URL = import.meta.env.VITE_API_URL;

// Fetch all posts
export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
        return [];
    }
};

// Fetch a single post by ID
export const fetchPostById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching post ${id}:`, error.response?.data || error.message);
        return null;
    }
};

// Create a new post
export const createPost = async (postData) => {
    try {
        const response = await axios.post(API_URL, postData);
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error.response?.data || error.message);
        return { error: error.response?.data || "Failed to create post" };
    }
};

// Update an existing post
export const updatePost = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error updating post ${id}:`, error.response?.data || error.message);
        return { error: error.response?.data || "Failed to update post" };
    }
};


// Delete a post
export const deletePost = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return { success: true };
    } catch (error) {
        console.error(`Error deleting post ${id}:`, error.response?.data || error.message);
        return { error: error.response?.data || "Failed to delete post" };
    }
};