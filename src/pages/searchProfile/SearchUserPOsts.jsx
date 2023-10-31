import React, { useEffect, useState } from 'react';
import { axiosRequest, getToken } from '/src/utilities/axiosRequest';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import CommentInput from '/src/components/Addcomment';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Post = ({ post }) => { 
  const navigate = useNavigate();
  const {id} =useParams()
  const userId=id

  const [isClicked, setIsClicked] = useState(false);
const [like, setLike] = useState(false);
useEffect(() => {
  
  const savedIsClicked = localStorage.getItem('isClicked');
  const savedLike = localStorage.getItem('like');

  if (savedIsClicked && savedLike) {
    setIsClicked(JSON.parse(savedIsClicked));
    setLike(JSON.parse(savedLike));
  }
}, []);
  const likePost = async (post) => {
    try {
      const { data } = await axiosRequest.post(`Post/like-Post?postId=${post}`)
      setIsClicked(!isClicked);
      setLike(!like);
  
     
      localStorage.setItem('isClicked', JSON.stringify(!isClicked));
      localStorage.setItem('like', JSON.stringify(!like));
    } catch (error) {
    }
  }

 
  
  const [profile,setprofile]=useState([])
 
  const getProfile2 = async () => {
    try {
      const { data } = await axiosRequest.get(
        `UserProfile/get-UserProfile-by-id?id=${userId}`
      );
    
      setprofile(data.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile2()
   
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = `http://65.108.148.136:8085/images/${post.images[0]}`; 
  const PostImagesExApi = "http://65.108.148.136:8085/images";

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeModal = () => {
    setIsDialogOpen(false);
  };
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const { data } = await axiosRequest.get(`Post/get-posts?UserId=${userId}`);
      setPosts(data.data);
    
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div 
      className="relative w-full h-full p-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >                                          
      <img src={imageUrl} alt="Post" className="w-96 h-96 max4:w-80 max4:h-80 max600:w-60 max600:h-60 max6:w-40 max6:h-40 object-cover"  />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center gap-[30px] justify-center p-4"onClick={openDialog}>
          <p className="text-white flex items-center gap-[5px]"> 🤍{post.postLikeCount}</p>
          <p className="text-white flex items-center gap-[5px]">💬 {post.commentCount}</p>
        </div>
      )}
<div 
  className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 ${isDialogOpen ? 'block' : 'hidden'}`}
  onClick={closeModal} 
>


<div 
  className='flex flex-row justify-between items-start bg-white w-9/12 h-5/6'
  onClick={(e) => e.stopPropagation()} // This line is added
>

          <img src={imageUrl} alt="Post" className="w-6/12 h-full object-cover" />
          <div className="w-6/12 overflow-y-auto">
        
            <div className="flex items-center space-x-2 p-4 border-b border-gray-300 gap-[5px]">
              
              <img src={profile.image ? `http://65.108.148.136:8085/images/${profile.image}` : '/src/assets/imagesuserprofile/gep-worldwide-computer-network-building-youth-nigeria-others-829f6a97f991a96566e6ac5910746622.png'} alt="" className="w-8 h-8 rounded-full object-cover" />
              <p className="font-bold dark:text-black">{profile.firstName}</p>
            </div>
            <div className="overflow-y-auto h-[520px] mt-[20px] ml-[20px] items-center"> 
            
              {post.comments && post.comments.map((comment, index) => (
                <div key={index} className="">
                  {post.userLikes && post.userLikes.map((like, index) => (
                    <div key={index} className="flex pt-[15px]  justify-start gap-[15px]">
                      <img src={like.userPhoto ? `http://65.108.148.136:8085/images/${like.userPhoto}` : '/src/assets/imagesuserprofile/gep-worldwide-computer-network-building-youth-nigeria-others-829f6a97f991a96566e6ac5910746622.png'} alt="" className="w-8 h-8  rounded-full object-cover" />
                      <p className="font-bold dark:text-black">{like.userName}</p>
                      <p className='dark:text-black'>{comment.comment}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="p-4">
              <div className='flex justify-between'>
                <div>
                <IconButton 
                  
                  onClick={()=>likePost(post.postId)}
                >
                            {
                    isClicked ? <svg
                        aria-label="Комментировать"
                        class="x1lliihq x1n2onr6"
                        color="rgb(0, 0, 0)"
                        fill=""
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        
                                        
                      
                                                <title>Нравится</title>
                                                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                                              </svg> 
                        :  <svg aria-label="Не нравится" className='cursor-pointer' class="x1lliihq x1n2onr6" color="rgb(255, 48, 64)" fill="rgb(255, 48, 64)" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Не нравится</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>     }
                    
                      </IconButton>
                      <IconButton> 
                        <svg
                          aria-label="Комментировать"
                          class="x1lliihq x1n2onr6"
                          color="rgb(0, 0, 0)"
                          fill="rgb(0, 0, 0)"
                          height="24"
                          role="img"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <title>Комментировать</title>
                          <path
                            d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                            fill="none"
                            stroke="currentColor"
                            stroke-linejoin="round"
                            stroke-width="2"
                          ></path>
                        </svg>
                      </IconButton>
                      <IconButton>
                        <svg
                          aria-label="Поделиться публикацией"
                          class="x1lliihq x1n2onr6"
                          color="rgb(0, 0, 0)"
                          fill="rgb(0, 0,0)"
                          height="24"
                          role="img"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <title>Поделиться публикацией</title>
                          <line
                            fill="none"
                            stroke="currentColor"
                            stroke-linejoin="round"
                            stroke-width="2"
                            x1="22"
                            x2="9.218"
                            y1="3"
                            y2="10.083"
                          ></line>
                          <polygon
                            fill="none"
                            points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                            stroke="currentColor"
                            stroke-linejoin="round"
                            stroke-width="2"
                          ></polygon>
                        </svg>
                      </IconButton>
</div>
                      <div>
                      <IconButton>
                        <svg
                          aria-label="Сохранить"
                          class="x1lliihq x1n2onr6"
                          color="rgb(0, 0, 0)"
                          fill="rgb(0, 0, 0)"
                          height="24"
                          role="img"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <title>Сохранить</title>
                          <polygon
                            fill="none"
                            points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          ></polygon>
                        </svg>
                      </IconButton>
                    </div></div>
              <p className='pl-[10px]'> {post.postLikeCount} likes</p>
              <p className='pl-[10px] text-[gray] text-[12px]'> {post.datePublished.slice(0,10)} </p>
               <div>
              <CommentInput postId={post.postId}/>
               </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};


const Posts = ({userId}) => {
  const [posts, setPosts] = useState([]);


  const getPosts = async () => {
    try {
      const { data } = await axiosRequest.get(`Post/get-posts?UserId=${userId}`);
      setPosts(data.data);
      console.log(data.data)
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const { data } = await axiosRequest.get(
        `UserProfile/get-UserProfile-by-id?id=${userId}`
      );
      console.log(data)
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    getProfile()
  }, []);









  return (
    <div className="grid gap-4 grid-cols-2  sm:grid-cols-3 md:grid-cols-3">
      {posts.map((post, index) => (
        <Post key={index} post={post}
         />
      ))}
    </div>
  );
};

export default Posts;


