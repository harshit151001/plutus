import PropTypes from "prop-types";
import { useState } from "react";
import { like } from "../../utils/posts";

const Post = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = async () => {
    try {
      setLoading(true);
      const likeCount = await like(post.uid, localStorage.getItem("userEmail"));
      console.log(likeCount);
      setLikes(likeCount);
    } catch (error) {
      console.error("Error occurred while liking the post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-5 flex gap-5 sm:gap-6 py-5 px-5 sm:px-6">
      <div>
        <div>
          <img
            className="w-[60px] h-[60px] rounded-full overflow-hidden"
            src={post.authorImage}
            alt="author"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
            }}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg leading-6 font-medium text-slate-950">
          {post.post}
        </h3>
        <button
          disabled={loading}
          onClick={handleLike}
          className="mt-1 max-w-2xl text-sm text-slate-500 bg-slate-200 w-fit px-2 py-1 rounded-md cursor-pointer disabled:opacity-70">
          <span className="text-indigo-600">Likes:</span>{" "}
          <span className="text-indigo-800">{likes}</span>
        </button>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
