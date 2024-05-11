import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import PostCard from "../components/PostCard";

export default function PersonalizeContent() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        setPosts(data.posts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center font-bold text-teal-500 my-5 h-full flex flex-col justify-center">
          You must be signed in to use this feature.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      </div>
    );
  }

const filteredPosts = new Set();

const personalizedKeywords = currentUser.personalizeKeyword;
const favoriteAuthors = currentUser.favoriteAuthors;

if (personalizedKeywords.length > 0 && favoriteAuthors.length > 0) {
  // Iterate through both arrays
  personalizedKeywords.forEach(keyword => {
    favoriteAuthors.forEach(author => {
      posts.forEach(post => {
        if (post.category === keyword && post.userId === author) {
          filteredPosts.add(post);
        } 
      });
    });
  });
}

if (personalizedKeywords.length > 0) {
  // Iterate through both arrays
  personalizedKeywords.forEach(keyword => {
      posts.forEach(post => {
        if (post.category === keyword) {
          filteredPosts.add(post);
        } 
      });
  });
}
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" className="w-20 h-20" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 py-7">
      <h2 className="text-2xl font-semibold text-center">Personalized Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center md:justify-between justify-items-center">
        {filteredPosts.size > 0 ? (
          [...filteredPosts].map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="h-full col-span-3">
            <div className=" text-center font-bold text-teal-500 my-5">
              No personalized posts found.
            </div>
            <div className=" text-center text-teal-500 my-10">
            Our recommendation system works based on previous interactions, <br/>
            but since you are a new user, it hasn't had the chance <br/>
            to learn from your interactions yet.
            </div>
          </div>
        )}
      </div>
      <Link
        to={"/search"}
        className="text-lg text-teal-500 hover:underline text-center"
      >
        View all posts
      </Link>
      {filteredPosts.length === 0 && <div className="h-screen"></div>}
    </div>
  );
}
