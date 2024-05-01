import { Button, Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { BASE_URL } from "../baseUrl";

export default function PostPage() {
  const { currentUser } = useSelector((state) => state.user);
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [postUser, setPostUser] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (post) {
          const res = await fetch(`/api/user/${post.userId}`);
          const data = await res.json();
          setPostUser(data.username);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [post]);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser?._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <p className="text-center text-sm space-x-2">
        by
        <span className="text-center text-base font-semibold italic">
          {" "}
          {postUser}
        </span>
      </p>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      {post && post.userId === currentUser?._id && (
        <div className="flex items-center gap-5 justify-center py-5">
          <Link to={`/update-post/${post._id}`}>
            <FaEdit size="1.5rem" />
          </Link>
          <span
            onClick={() => {
              setShowModal(true);
              setPostIdToDelete(post._id);
            }}
            className="cursor-pointer"
          >
            <MdDelete size="1.5rem" />
          </span>
        </div>
      )}
      {console.log(post)}
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full"></div>
      {post && <CommentSection postId={post._id} />}

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
}
