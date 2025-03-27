import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-blue-600 text-white py-4 shadow-md">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        <Link to="/" className="text-2xl font-bold">My Blog</Link>
                        <Link to="/create" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200">
                            + Create Post
                        </Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow container mx-auto px-4 py-6">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/posts/:id" element={<PostDetails />} />
                        <Route path="/create" element={<CreatePost />} />
                        <Route path="/posts/:id/edit" element={<EditPost />} />
                    </Routes>
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 text-white text-center py-4 mt-6">
                    <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;