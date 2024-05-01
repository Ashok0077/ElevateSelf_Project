import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

import HeroImage from "../assets/HeroImage.svg";
import { Spinner } from "flowbite-react";
import { BASE_URL } from "../baseUrl";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/post/getPosts");
        // const res = await fetch(`${BASE_URL}/api/post/getPosts`);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" className="w-20 h-20" />
      </div>
    );
  }

  return (
    <div>
      {/* <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div> */}

      <section className="container mx-auto max-w-[1400px] flex flex-col px-5 py-5 lg:flex-row">
        <div className="mt-10 lg:w-1/2">
          <h1 className="font-roboto text-3xl text-center font-bold text-[#183b56] md:text-5xl lg:text-4xl xl:text-6xl lg:text-left lg:max-w-[540px] dark:text-stone-100">
            Want to develop? Let ElevateSelf assist you.
          </h1>
          <p className="text-[#5a7188] mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left dark:text-stone-300">
            Read other people's success stories, follow their guidance, learn
            from them, implement in life, and witness the magic. Join us on this
            empowering quest to elevate your life and create a future filled
            with success, fulfillment, and joy. Our platform offers a treasure
            trove of inspiring success stories from real people who have
            triumphed over challenges and achieved their dreams.
          </p>

          {/* <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
            <span className="text-[#5a7184] font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
              Popular Tags:
            </span>
            <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
              <li className="rounded-lg bg-[#7999cd] bg-opacity-10 px-3 py-1.5 text-[#1569db] font-semibold">
                Interviews
              </li>
              <li className="rounded-lg bg-[#7999cd] bg-opacity-10 px-3 py-1.5 text-[#1569db] font-semibold">
                GATE
              </li>
              <li className="rounded-lg bg-[#7999cd] bg-opacity-10 px-3 py-1.5 text-[#1569db] font-semibold">
                Placement
              </li>
              <li className="rounded-lg bg-[#7999cd] bg-opacity-10 px-3 py-1.5 text-[#1569db] font-semibold">
                Fitness
              </li>
            </ul>
          </div> */}
        </div>
        <div className="hidden lg:block lg:1/2">
          <img
            className="w-full"
            src={HeroImage}
            alt="users are reading articles"
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6 items-center">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center md:justify-between justify-items-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
