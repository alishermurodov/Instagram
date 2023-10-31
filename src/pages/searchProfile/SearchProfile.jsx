
import { useParams } from 'react-router-dom'

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { axiosRequest, getToken } from "/src/utilities/axiosRequest.js";
import axios from "axios";
import { use } from "i18next";
import { Update } from "@mui/icons-material";
import Posts from './SearchUserPOsts';
const SearchProfile = () => {
    const[newUser,setnewUser]=useState("")
  const {id} =useParams()
  const userId=id
  const navigate = useNavigate();
  console.log(userId)

  const [activeTab, setActiveTab] = useState("posts");

  const [user, setUser] = useState("");
  const InstagramTabs = () => {
   const [activeTab, setActiveTab] = useState("posts");
  };
  const getProfile = async () => {
    try {
     const { data } = await axiosRequest.get(
       `UserProfile/get-UserProfile-by-id?id=${userId}`
     );
     setUser(data?.data);

 console.log(data.data)
     
   } catch (error) {
     console.log(error);
   }
    };

    const [Userpost,setuserpost]=useState()
 const [Userfollowers,setUserfollowers]=useState()
 const [Userfollowing,setUserfollowing]=useState()
 
 const getFollowers = async (userId) => {
  try {
    const { data } = await axiosRequest.get(`/UserProfile/CounterProfile?id=${userId}`);

    console.log(data);
    setuserpost(data.data.post)
    setUserfollowers(data.data.follower)
    setUserfollowing(data.data.following)
  } catch (error) {
    console.log(error);
  }
};
const getFollowingRelationshipById = async (userId) => {
  try {
    const { data } = await axiosRequest.get(
      `FollowingRelationShip/get-FollowingRelationShip-by-id?id=${userId}`
    );
console.log(userId)
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const getUser=async()=>{
  try {
    const {data}= await axiosRequest.get(`User/get-User-by-id?${userId}`)
    console.log(data.data )
  } catch (error) {
    console.log(error)
  }
}


useEffect(() => {
  getProfile();
  getFollowers(userId);
  getFollowingRelationshipById(userId)
}, []);


  return (
    <div className=" dark:bg-black dark:text-white">
    <div className="flex justify-center max5:justify-start pt-[50px]">
      <div className="w-40 h-40 max5:w-20 max5:h-20 relative flex justify-center items-center rounded-full overflow-hidden">
        <img
          src={`${import.meta.env.VITE_APP_FILES_URL}${user?.image}`}
          alt="Profile"
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="flex max5:block items-center ml-[50px] max6:ml-[20px]">
          <div className="flex max5:gap-[10px] items-center">
            <h1 className="text-[20px]">{user.firstName}</h1>
            <svg
              className="hidden max5:flex"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 100 100"
              id="settings"
            >
              <g>
                <path d="M88.9 58.8c-2.4-2.3-3.7-5.5-3.7-8.8 0-3.3 1.3-6.4 3.7-8.8.4-.4.8-.7 1.3-1.1.7-.5.9-1.4.7-2.2-.8-2.9-2-5.7-3.4-8.3-.4-.7-1.2-1.1-2-1-.7.1-1.2.1-1.7.1-6.9 0-12.5-5.6-12.5-12.4 0-.5 0-1.1.1-1.7.1-.8-.3-1.6-1-2-2.6-1.4-5.4-2.6-8.3-3.4-.8-.2-1.7.1-2.2.7-.4.5-.8 1-1.1 1.3-2.4 2.3-5.5 3.6-8.8 3.6s-6.5-1.3-8.8-3.6c-.4-.4-.7-.8-1.1-1.3-.5-.7-1.4-.9-2.2-.7-2.9.9-5.7 2-8.3 3.4-.7.4-1.1 1.2-1 2 .1.7.1 1.2.1 1.7 0 6.9-5.6 12.4-12.5 12.4-.5 0-1.1 0-1.7-.1-.8-.1-1.6.3-2 1-1.4 2.6-2.6 5.4-3.4 8.3-.2.8 0 1.7.7 2.2.6.4 1 .8 1.3 1.1 4.9 4.8 4.9 12.7 0 17.6-.4.4-.8.7-1.3 1.1-.7.5-.9 1.4-.7 2.2.9 2.9 2 5.7 3.4 8.3.4.7 1.2 1.1 2 1 .7-.1 1.2-.1 1.7-.1 6.9 0 12.5 5.6 12.5 12.4 0 .5 0 1.1-.1 1.7-.1.8.3 1.6 1 2 2.6 1.4 5.4 2.6 8.3 3.4.8.2 1.7 0 2.2-.7.4-.5.8-1 1.1-1.3 2.4-2.3 5.5-3.6 8.8-3.6s6.5 1.3 8.8 3.6c.4.4.7.8 1.1 1.3.4.5 1 .8 1.6.8.2 0 .4 0 .6-.1 2.9-.9 5.7-2 8.3-3.4.7-.4 1.1-1.2 1-2-.1-.7-.1-1.2-.1-1.7 0-6.9 5.6-12.4 12.5-12.4.5 0 1.1 0 1.7.1.8.1 1.6-.3 2-1 1.4-2.6 2.6-5.4 3.4-8.3.2-.8 0-1.7-.7-2.2-.5-.4-1-.7-1.3-1.1zm-4.3 8.5h-.9c-9.1 0-16.5 7.4-16.5 16.4v.9c-1.6.8-3.3 1.5-5.1 2.1l-.6-.6c-3.1-3.1-7.2-4.8-11.6-4.8s-8.5 1.7-11.6 4.8l-.6.6c-1.7-.6-3.4-1.3-5.1-2.1v-.9c0-9.1-7.4-16.4-16.5-16.4h-.9c-.8-1.6-1.5-3.3-2.1-5.1l.6-.6c6.4-6.4 6.4-16.8 0-23.3l-.6-.6c.6-1.7 1.3-3.4 2.1-5.1h.9c9.1 0 16.5-7.4 16.5-16.4v-.9c1.6-.8 3.3-1.5 5.1-2.1l.6.6c3.1 3.1 7.2 4.8 11.6 4.8s8.5-1.7 11.6-4.8l.6-.6c1.7.6 3.4 1.3 5.1 2.1v.9c0 9.1 7.4 16.4 16.5 16.4h.9c.8 1.6 1.5 3.3 2.1 5.1l-.6.6c-3.1 3.1-4.8 7.2-4.8 11.6s1.7 8.5 4.8 11.6l.6.6c-.6 1.9-1.3 3.6-2.1 5.2zM50 26.2c-13.1 0-23.8 10.7-23.8 23.8S36.9 73.8 50 73.8 73.8 63.1 73.8 50 63.1 26.2 50 26.2zm0 43.6c-10.9 0-19.8-8.9-19.8-19.8S39.1 30.2 50 30.2 69.8 39.1 69.8 50 60.9 69.8 50 69.8z"></path>
              </g>
              <g>
                <path
                  fill="#00F"
                  d="M1644-790V894H-140V-790h1784m8-8H-148V902h1800V-798z"
                ></path>
              </g>
            </svg>
          </div>
          <div className="flex gap-[20px] ml-[20px]  max5:ml-[0] max5:mt-[20px]">
            <button
              className="w-[110px] h-[35px] max5:w-[100px] rounded-lg bg-[#dedddd] font-medium hover:bg-[#e5e3e3] max5:text-[15px] hidden"
              onClick={() => {
                setModal(true);
              }}
            >
              Edit Profile
            </button>
            <button className="w-[110px] max5:w-[105px]  h-[35px] rounded-lg bg-[#dedddd] font-medium hover:bg-[#e5e3e3] max5:text-[15px] hidden">
              View archive
            </button>
            <div className=" order-10 max5:hidden items-center hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 100 100"
                id="settings"
              >
                <g>
                  <path d="M88.9 58.8c-2.4-2.3-3.7-5.5-3.7-8.8 0-3.3 1.3-6.4 3.7-8.8.4-.4.8-.7 1.3-1.1.7-.5.9-1.4.7-2.2-.8-2.9-2-5.7-3.4-8.3-.4-.7-1.2-1.1-2-1-.7.1-1.2.1-1.7.1-6.9 0-12.5-5.6-12.5-12.4 0-.5 0-1.1.1-1.7.1-.8-.3-1.6-1-2-2.6-1.4-5.4-2.6-8.3-3.4-.8-.2-1.7.1-2.2.7-.4.5-.8 1-1.1 1.3-2.4 2.3-5.5 3.6-8.8 3.6s-6.5-1.3-8.8-3.6c-.4-.4-.7-.8-1.1-1.3-.5-.7-1.4-.9-2.2-.7-2.9.9-5.7 2-8.3 3.4-.7.4-1.1 1.2-1 2 .1.7.1 1.2.1 1.7 0 6.9-5.6 12.4-12.5 12.4-.5 0-1.1 0-1.7-.1-.8-.1-1.6.3-2 1-1.4 2.6-2.6 5.4-3.4 8.3-.2.8 0 1.7.7 2.2.6.4 1 .8 1.3 1.1 4.9 4.8 4.9 12.7 0 17.6-.4.4-.8.7-1.3 1.1-.7.5-.9 1.4-.7 2.2.9 2.9 2 5.7 3.4 8.3.4.7 1.2 1.1 2 1 .7-.1 1.2-.1 1.7-.1 6.9 0 12.5 5.6 12.5 12.4 0 .5 0 1.1-.1 1.7-.1.8.3 1.6 1 2 2.6 1.4 5.4 2.6 8.3 3.4.8.2 1.7 0 2.2-.7.4-.5.8-1 1.1-1.3 2.4-2.3 5.5-3.6 8.8-3.6s6.5 1.3 8.8 3.6c.4.4.7.8 1.1 1.3.4.5 1 .8 1.6.8.2 0 .4 0 .6-.1 2.9-.9 5.7-2 8.3-3.4.7-.4 1.1-1.2 1-2-.1-.7-.1-1.2-.1-1.7 0-6.9 5.6-12.4 12.5-12.4.5 0 1.1 0 1.7.1.8.1 1.6-.3 2-1 1.4-2.6 2.6-5.4 3.4-8.3.2-.8 0-1.7-.7-2.2-.5-.4-1-.7-1.3-1.1zm-4.3 8.5h-.9c-9.1 0-16.5 7.4-16.5 16.4v.9c-1.6.8-3.3 1.5-5.1 2.1l-.6-.6c-3.1-3.1-7.2-4.8-11.6-4.8s-8.5 1.7-11.6 4.8l-.6.6c-1.7-.6-3.4-1.3-5.1-2.1v-.9c0-9.1-7.4-16.4-16.5-16.4h-.9c-.8-1.6-1.5-3.3-2.1-5.1l.6-.6c6.4-6.4 6.4-16.8 0-23.3l-.6-.6c.6-1.7 1.3-3.4 2.1-5.1h.9c9.1 0 16.5-7.4 16.5-16.4v-.9c1.6-.8 3.3-1.5 5.1-2.1l.6.6c3.1 3.1 7.2 4.8 11.6 4.8s8.5-1.7 11.6-4.8l.6-.6c1.7.6 3.4 1.3 5.1 2.1v.9c0 9.1 7.4 16.4 16.5 16.4h.9c.8 1.6 1.5 3.3 2.1 5.1l-.6.6c-3.1 3.1-4.8 7.2-4.8 11.6s1.7 8.5 4.8 11.6l.6.6c-.6 1.9-1.3 3.6-2.1 5.2zM50 26.2c-13.1 0-23.8 10.7-23.8 23.8S36.9 73.8 50 73.8 73.8 63.1 73.8 50 63.1 26.2 50 26.2zm0 43.6c-10.9 0-19.8-8.9-19.8-19.8S39.1 30.2 50 30.2 69.8 39.1 69.8 50 60.9 69.8 50 69.8z"></path>
                </g>
                <g>
                  <path
                    fill="#00F"
                    d="M1644-790V894H-140V-790h1784m8-8H-148V902h1800V-798z"
                  ></path>
                </g>
              </svg>
            
            </div>{" "}
             <div className="flex gap-[20px] ml-[20px]  max5:ml-[0] max5:mt-[20px]">
             <button
      onClick={(e) => {
        e.target.textContent = e.target.textContent === 'Follow' ? 'Following' : 'Follow';
      }}
      className="w-[100px] h-[30px] max5:w-[100px] rounded-lg bg-[#dedddd] font-medium hover:bg-[#e5e3e3] max5:text-[15px]"
    >
      Follow
    </button>
    <button   className="w-[100px] h-[30px] max5:w-[100px] rounded-lg bg-[#dedddd] font-medium hover:bg-[#e5e3e3] max5:text-[15px]"    onClick={() => navigate(`/home/messages`)}>Message</button>
            </div>
          </div>
        </div>
        <div className="flex ml-[50px] mt-[30px] gap-[50px] max600:hidden">
          <div className="flex gap-[5px]">
            <h1 className="text-[16px] font-medium flex gap-[5px]">
              {Userpost}
              <h1 className="text-[16px]">Posts</h1>
            </h1>
          </div>
          <div className="flex gap-[5px]">
            <h1 className="text-[16px] font-medium">{Userfollowers}</h1>
            <h1 className="text-[16px]">followers</h1>
          </div>
          <div className="flex gap-[5px]">
            <h1 className="text-[16px] font-medium">{Userfollowing}</h1>
            <h1 className="text-[16px]">following</h1>
          </div>
        </div>
        <div className="flex ml-[50px] mt-[12px]  max600:ml-[-65px]">
          <h1 className=" font-medium text-[15px]">{user.lastName}</h1>
        </div>
        <div className="flex ml-[50px] mt-[5px] max600:ml-[-65px]">
          <h1 className="w-[300px] text-[16px] max600:w-[300px]">{user.about}</h1>
          
        </div>
  
        <div className="mt-[50px] ml-[-200px] max5:ml-[-80px]">
          <div className="w-[80px] max5:w-[70px] max5:h-[70px] max rounded-full h-[80px] border-[2px] flex justify-center items-center ">
            <button className="text-gray-400 ">
              <img
                className="w-[30px] max5:w-[20px]"
                src="/src/assets/imagesuserprofile/add.png"
                alt=""
              />
            </button>
          </div>
          <p className="ml-[25px] mt-[5px] text-[18px] ">new</p>
        </div>
      </div>
    </div>
  
    <div className="justify-center mt-[50px] hidden max600:flex">
      <button className="w-[100%] h-[2px] bg-[#e3e2e2]"></button>
    </div>
    <div className="max600:flex justify-around mt-[10px] hidden">
      <div className="flex flex-col items-center">
        <h1 className=" font-medium">1</h1>
        <span>posts</span>
      </div>
      <div className="flex flex-col items-center">
        <h1 className=" font-medium">87</h1>
        <span>followers</span>
      </div>
      <div className="flex flex-col items-center">
        <h1 className=" font-medium">182</h1>
        <span>following</span>
      </div>
    </div>
  
    <div className="mt-[50px]">
      <div className="flex flex-col items-center">
        <div className="flex mb-4 gap-[100px] max600:gap-[50px] max7:gap-[20px]">
          <button
            className={`flex items-center text-[18px] px-4 py-2 ${
              activeTab === "posts"
                ? "text-black dark:text-white border-t-2  border-gray-300 font-medium"
                : ""
            }`}
            onClick={() => setActiveTab("posts")}
          >
            <img
              className="w-[16px] bg-gray-100"
              src="data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZD0iTTQ4IDJIMnY0Nmg0NlYyem0tMiAxMWgtOVY0aDl2OXptLTIwIDBWNGg5djloLTl6bTkgMnY5aC05di05aDl6bS0xMS0yaC05VjRoOXY5em0wIDJ2OWgtOXYtOWg5em0tMTEgOUg0di05aDl2OXptMCAydjlINHYtOWg5em0yIDBoOXY5aC05di05em05IDExdjloLTl2LTloOXptMiAwaDl2OWgtOXYtOXptMC0ydi05aDl2OWgtOXptMTEtOWg5djloLTl2LTl6bTAtMnYtOWg5djloLTl6TTEzIDR2OUg0VjRoOXpNNCAzN2g5djlINHYtOXptMzMgOXYtOWg5djloLTl6Ii8+PC9zdmc+"
              alt=""
            />
            <span className="ml-2">Posts</span>
          </button>
  
          <button
            className={`flex items-center gap-[5px] text-[18px] px-4 py-2 ${
              activeTab === "saved"
                ? "text-black dark:text-white font-medium border-t-2 border-gray-300"
                : ""
            }`}
            onClick={() => setActiveTab("saved")}
          >
            <img
              src="/src/assets/imagesuserprofile/save-instagram.png"
              className="w-[16px]"
              alt=""
            />{" "}
            Reels
          </button>
          <button
            className={`flex items-center text-[18px] gap-[5px] px-4 py-2 ${
              activeTab === "tagged"
                ? "text-black dark:text-white font-medium border-t-2 border-gray-300"
                : ""
            }`}
            onClick={() => setActiveTab("tagged")}
          >
            <img
              src="/src/assets/imagesuserprofile/user.png"
              className="w-[16px]"
              alt=""
            />
            Tagged
          </button>
        </div>
  
        {activeTab === "posts" && (
          <div>
            <div className="flex justify-center gap-[5px] flex-wrap">
            <Posts userId={userId} />
            </div>
          </div>
        )}
        {activeTab === "saved" && (
          <div className='flex justify-center items-center'>
          <h1 className='mt-[100px] text-[20px] font-medium'>No Reels</h1>
          </div>
        )}
        {activeTab === "tagged" && (
          <div>
            <div className="flex flex-col items-center justify-center mt-[50px] text-center">
              <img
                className="w-[80px]"
                src="/src/assets/imagesuserprofile/users.png"
                alt=""
              />
              <h1 className=" font-bold text-[32px] mt-[20px]">Photos of You</h1>
              <h1 className="mt-[20px]">
                When people tag you in photos, they'll appear here.
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="flex justify-center gap-[25px] mt-[100px] max3:hidden">
      <a className="text-[gray] text-[15px]">about</a>
      <a className="text-[gray] text-[15px]">About</a>
      <a className="text-[gray] text-[15px]">Blog</a>
      <a className="text-[gray] text-[15px]">Jobs</a>
      <a className="text-[gray] text-[15px]">Help</a>
      <a className="text-[gray] text-[15px]">API</a>
      <a className="text-[gray] text-[15px]">Privacy</a>
      <a className="text-[gray] text-[15px]">Terms</a>
      <a className="text-[gray] text-[15px]">Locations</a>
      <a className="text-[gray] text-[15px]">Instagram Lite</a>
      <a className="text-[gray] text-[15px]">Threads</a>
      <a className="text-[gray] text-[15px]">Contact Uploading & Non-Users</a>
      <a className="text-[gray] text-[15px]">Meta Verified</a>
    </div>
    <div className="flex justify-center gap-[15px] h-[10vh] items-center max3:hidden">
      <select className="text-[gray] text-[15px]" name="" id="">
        <option className="text-[gray] text-[15px]" value="">
          English
        </option>
        <option className="text-[gray] text-[15px]" value="">
          Russuin
        </option>
      </select>
      <h1 className="text-[gray] text-[15px]">© 2023 Instagram from SoftClub</h1>
    </div>
    </div>
  )
}

export default SearchProfile