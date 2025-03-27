import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const App = () => {
    return (
        <div className="max-w-2xl mx-auto mt-5">
            <h1 className="text-2xl font-bold text-center">Blog App</h1>
            <PostForm onPostCreated={() => window.location.reload()} />
            <PostList />
        </div>
    );
};

export default App;