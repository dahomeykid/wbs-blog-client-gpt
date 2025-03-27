import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to handle API errors
const handleError = (error) => {
    if (error.response) {
        // Server responded with a status other than 2xx
        return error.response.data.message || "Something went wrong! Please try again later.";
    } else if (error.request) {
        // The request was made, but no response was received
        return "Network error! Please check your internet connection.";
    } else {
        // Something else caused the error
        return error.message || "An unexpected error occurred.";
    }
};

// Fetch all posts
export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        return response.data;
    } catch (error) {
        const errorMessage = handleError(error);
        console.error("Error fetching posts:", errorMessage);
        return { error: errorMessage };
    }
};

// Fetch a single post by ID
export const fetchPostById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = handleError(error);
        console.error(`Error fetching post ${id}:`, errorMessage);
        return { error: errorMessage };
    }
};

// Create a new post
export const createPost = async (postData) => {
    try {
        const response = await axios.post(API_URL, postData);
        return response.data;
    } catch (error) {
        const errorMessage = handleError(error);
        console.error("Error creating post:", errorMessage);
        return { error: errorMessage };
    }
};

// Update an existing post
export const updatePost = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        const errorMessage = handleError(error);
        console.error(`Error updating post ${id}:`, errorMessage);
        return { error: errorMessage };
    }
};


// Delete a post
export const deletePost = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return { success: true };
    } catch (error) {
        const errorMessage = handleError(error);
        console.error(`Error deleting post ${id}:`, errorMessage);
        return { error: errorMessage };
    }
};