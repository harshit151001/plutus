import { useEffect, useState } from "react";
import { getUser, updateUser } from "../utils/user";
import { createPost, getPostByUser } from "../utils/posts";
import { v4 as uuidv4 } from "uuid";
import Post from "../components/card/post";
import PropTypes from "prop-types";

const Author = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      getPostByUser(localStorage.getItem("userEmail")).then((posts) => {
        setPosts(posts);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const prependNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="max-w-7xl px-[5%] mx-auto">
      <div className="mt-10">
        <h1 className="text-base text-indigo-400 underline underline-offset-1">
          Profile
        </h1>
      </div>
      <div className="mt-5">
        <AuthorForm />
      </div>
      <div className="mt-10">
        <h1 className="text-base text-indigo-400 underline underline-offset-1">
          Create Post
        </h1>
      </div>
      <div className="mt-5">
        <PostForm prependNewPost={prependNewPost} />
      </div>
      <div className="mt-10">
        <h1 className="text-base text-indigo-400 underline underline-offset-1">
          My Posts
        </h1>
      </div>
      <div className="mt-5">
        {posts.map((post) => (
          <Post key={post.uid} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Author;

function AuthorForm() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      updateUser(localStorage.getItem("userEmail"), {
        name,
        email: localStorage.getItem("userEmail"),
        image,
        role: "author",
      }).then(() => {
        localStorage.setItem("userRole", "author");
        localStorage.setItem("userName", name);
        localStorage.setItem("userImage", image);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      getUser(localStorage.getItem("userEmail")).then((user) => {
        setName(user.name || "");
        setEmail(user.email || "");
        setImage(user.image || "");
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-950">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-950">
            Email address
          </label>
          <input
            disabled={true}
            type="text"
            name="email"
            id="email"
            autoComplete="email"
            value={email}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-slate-950">
            Image
          </label>
          <input
            type="text"
            name="image"
            id="image"
            autoComplete="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <button
            disabled={loading}
            type="submit"
            className="focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm px-3 p-2 rounded-md bg-indigo-500 text-white disabled:opacity-70">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}

function PostForm({ prependNewPost }) {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      uid: uuidv4(),
      post: post,
      email: localStorage.getItem("userEmail"),
      authorImage: localStorage.getItem("userImage"),
      likes: 0,
    };

    try {
      setLoading(true);
      createPost(newPost).then(() => {
        prependNewPost(newPost);
        setPost("");
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <label
            htmlFor="post"
            className="block text-sm font-medium text-slate-950">
            How are you feeling today?
          </label>
          <input
            type="text"
            name="post"
            id="post"
            autoComplete="post"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <button
            disabled={loading}
            type="submit"
            className="focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm px-3 p-2 rounded-md bg-indigo-500 text-white disabled:opacity-70">
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

PostForm.propTypes = {
  prependNewPost: PropTypes.func.isRequired,
};
