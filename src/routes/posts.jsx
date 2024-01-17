import { useEffect, useState } from "react";
import { getPosts } from "../utils/posts";
import Post from "../components/card/post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      getPosts().then((posts) => {
        setPosts(posts);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="max-w-7xl px-[5%] mx-auto">
      <div className="mt-10">
        <h1 className="text-base text-indigo-400 underline underline-offset-1">
          Posts
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

export default Posts;
