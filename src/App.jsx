import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
import EditPost from "./components/EditPost";

const App = () => {
    return (
        <Router>
            <div className="max-w-2xl mx-auto mt-5">
                <h1 className="text-2xl font-bold text-center">Blog App</h1>
                <Routes>
                    <Route path="/" element={<>
                        <PostForm onPostCreated={() => window.location.reload()} />
                        <PostList />
                    </>} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/posts/:id/edit" element={<EditPost />} />
                </Routes>
            </div>
        </Router>
    );
};
export default App;