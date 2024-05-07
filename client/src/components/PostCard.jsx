import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess, updateFailure } from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import { BASE_URL } from "../baseUrl";

export default function PostCard({ post }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const handleClick = async () => {
    try {
      if (!currentUser) {
        console.log("Current user not found");
        return;
      }
       
     // console.log(currentUser.personalizeKeyword);
      // Create an array to hold the updated keywords
      const updatedKeywords = [post.category];

     
      for (let i = 0; i < currentUser.personalizeKeyword.length; i++) {
        if (currentUser.personalizeKeyword[i] !== post.category) {
          updatedKeywords.push(currentUser.personalizeKeyword[i]);
        }
      }

     // console.log("after adding keyword");
     // console.log(updatedKeywords);

      
      const response = await fetch(`api/user/updateKeywords/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ personalizeKeyword: updatedKeywords }),
      });

      const data = await response.json();
      if (!response.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      console.error('Error updating keywords:', error);
      setUpdateUserError('Error updating keywords');
    }
  };

  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[400px] transition-all">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20 cursor-pointer"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          onClick={handleClick}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}

