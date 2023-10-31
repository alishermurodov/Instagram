import React, { useEffect, useState } from "react";
import Modal from "../../components/Explorehandaler/Handler";
import { axiosRequest, getToken } from "../../utilities/axiosRequest";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

const Explore = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const PostImagesExApi = "http://65.108.148.136:8085/images";
  const [postEx, setPostEx] = useState([]);
  const PostId = getToken()?.pid;
  const [users,setUsers]= useState([]);
  const [modalObj,setModalObj] = useState();
  const [isHovered, setIsHovered] = useState([]);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        const { data: postData } = await axiosRequest.get(`Post/get-posts`);
        setPostEx(postData.data);
        setIsHovered(new Array(postData.data.length).fill(false));

        const { data: userData } = await axiosRequest.get(`User/get-users`);
        setUsers(userData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostsAndUsers();
  }, []);
  
  const handleClick = (element) => {
    setShowModal(true);
    const user = users.find(user => user.id === element.userId);
    setModalObj({ ...element, user });
  };
  
  const handleClose = () => {
    setShowModal(false);
  };

  const fallbackImageURL = "../src/assets/imagesuserprofile/uwp3981822 (1).jpeg";

  return (
    <div className="gap-[20px] pt-[20px] w-[80%] grid grid-cols-3 ml-[10%]">
      {postEx.map((e, index) => {
        return (
          <div 
          onClick={() => handleClick(e)}  
          className="flex imggg relative" 
            key={e.postId}
            onMouseEnter={() => setIsHovered(oldState => {
              const newState = [...oldState];
              newState[index] = true;
              return newState;
            })}
            onMouseLeave={() => setIsHovered(oldState => {
              const newState = [...oldState];
              newState[index] = false;
              return newState;
            })}
          >
            <img
              
              className="w-[400px]"
              src={`${PostImagesExApi}/${e.images[0]}`}
              alt="img"
              onError={(event) => event.target.src = fallbackImageURL}
            />
            {isHovered[index] && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center gap-[30px] justify-center p-4">
                <p className="text-white flex items-center gap-[5px]">🤍 {e.postLikeCount}</p>
                <p className="text-white flex items-center gap-[5px]">💬 {e.comments.length}</p>
              </div>
            )}
            {e.images.length > 1 && (
              <div className="absolute top-0 right-0">
                <PhotoLibraryIcon/> 
              </div>
            )}
          </div>
        );
      })}
      {showModal && <Modal postObj={modalObj} content={modalContent} onClose={handleClose} users={users} />}
    </div>
  );
};

export default Explore;


{/* <div class="container">
<div class="area1" onClick={() => handleClick(<img className=" h-[100%]" src="https://th.bing.com/th/id/R.bdc53f193c4876a40019126cbe555bb9?rik=lgFR%2fnWZhwhchQ&pid=ImgRaw&r=0" alt="" />)}>
<img src="https://th.bing.com/th/id/R.bdc53f193c4876a40019126cbe555bb9?rik=lgFR%2fnWZhwhchQ&pid=ImgRaw&r=0" alt="" />
</div>
<div class="area2" onClick={() => handleClick(<img className=" h-[100%]" src="https://th.bing.com/th/id/OIP.anp0XQz24UeOEE5qf-5swQHaEo?pid=ImgDet&rs=1" alt="" />)}>
<img src="https://th.bing.com/th/id/OIP.anp0XQz24UeOEE5qf-5swQHaEo?pid=ImgDet&rs=1" alt="" />
</div>
<div class="area-4" onClick={() => handleClick( <video className=" h-[80vh]"  width="100%" height="100%" controls autoPlay muted loop preload="auto">
<source src="../src/assets/321011280_853427726405801_7678946478483476727_n.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video> )}>
<PreviewComponent>

<video className=" h-[80vh]"  width="100%" height="100%" controls autoPlay muted loop preload="auto">
<source src="../src/assets/321011280_853427726405801_7678946478483476727_n.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>
</PreviewComponent>

</div>
<div class="area5" onClick={() => handleClick(<img className=" h-[100%]" src="https://th.bing.com/th/id/OIP.OB8fZBMtLZD6VMfENy0PJAHaE8?pid=ImgDet&rs=1" alt="" />)}>
<img src="https://th.bing.com/th/id/OIP.OB8fZBMtLZD6VMfENy0PJAHaE8?pid=ImgDet&rs=1" alt="" />
</div>
<div class="area-6" onClick={() => handleClick(<img className=" h-[100%]" src="https://th.bing.com/th/id/R.5e077170933c851bc18b701826af53bc?rik=bQYR%2bCGHrFxigQ&riu=http%3a%2f%2fi.mdel.net%2fnewfaces%2fi%2f2016%2f02%2fmotw_02181610-600x600.jpg&ehk=9v2k6QCuE%2fKxCubxzji5Y%2fz06g0dt57%2bvMuqyy6aJgE%3d&risl=&pid=ImgRaw&r=0" alt="" />)}>
<img src="https://th.bing.com/th/id/R.5e077170933c851bc18b701826af53bc?rik=bQYR%2bCGHrFxigQ&riu=http%3a%2f%2fi.mdel.net%2fnewfaces%2fi%2f2016%2f02%2fmotw_02181610-600x600.jpg&ehk=9v2k6QCuE%2fKxCubxzji5Y%2fz06g0dt57%2bvMuqyy6aJgE%3d&risl=&pid=ImgRaw&r=0" alt="" />
</div>
<div class="area-8" onClick={() => handleClick(<img className=" h-[100%]" src="https://th.bing.com/th/id/OIP._yC174sEBWELImhmt0sS8gHaE2?pid=ImgDet&rs=1" alt="" />)}>
<img src="https://th.bing.com/th/id/OIP._yC174sEBWELImhmt0sS8gHaE2?pid=ImgDet&rs=1" alt="" />
</div>
<div class="area-11" onClick={() => handleClick(<img className=" h-[100%]" src="https://th.bing.com/th/id/OIP.IwPTUINIel4wPAwQM8devgHaE7?pid=ImgDet&rs=1" alt="" />)}>
<img src="https://th.bing.com/th/id/OIP.IwPTUINIel4wPAwQM8devgHaE7?pid=ImgDet&rs=1" alt="" />
</div>
<div class="area-7" onClick={() => handleClick(  <video className=" h-[80vh]  "  width="100%" height="100%" controls autoPlay muted loop preload="auto">
<source src="../src/assets/319618509_1006980723918556_4270605473213176322_n.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>)}>
<video className=" h-[80vh]  "  width="100%" height="100%" controls autoPlay muted loop preload="auto">
<source src="../src/assets/319618509_1006980723918556_4270605473213176322_n.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>
</div>
<div class="area-9"  onClick={() => handleClick(<img className=" h-[100%]" src="https://thumbs.dreamstime.com/z/smiling-friends-making-selfie-outdoors-friendship-leisure-summer-technology-people-concept-71564548.jpg" alt="" />)}>
<img src="https://thumbs.dreamstime.com/z/smiling-friends-making-selfie-outdoors-friendship-leisure-summer-technology-people-concept-71564548.jpg" alt="" />
</div>
<div class="area-10"  onClick={() => handleClick(<img className=" h-[100%]" src="https://images4.alphacoders.com/595/thumb-1920-595482.jpg" alt="" />)}>
<img src="https://images4.alphacoders.com/595/thumb-1920-595482.jpg" alt="" />
</div>
</div> */}