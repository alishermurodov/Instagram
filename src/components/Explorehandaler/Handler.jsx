  import React, { useState } from 'react';
  const Modal = ({ content, onClose ,postObj,users}) => {
    const [comments, setComments] = useState(['Great post!',  'Love this.', 'Amazing!']);
    console.log(postObj,)
    const handleAddComment = (event) => {
      if (event.key === 'Enter') {
        setComments([...comments, event.target.value]);
        event.target.value = '';
      }
    };
    console.log(users,"asdas")

    // Define a fallback avatar URL
    const  fallbackAvatarURL = "https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?pid=ImgDet&rs=1";


    return (
      <div className="modal w-[100%] h-[100%]">
        <h1 className="close absolute text-[70px] ml-[94%] mt-[40px] text-[white]" onClick={onClose}>×</h1>
        <div className="modal-content h-[80vh] flex justify-center  mt-[60px]   w-[80%]">
          <div className="left-div h-[100%] w-[55%]">
          <img className=' h-[100%] w-[100%]' src={import.meta.env.VITE_APP_FILES_URL+postObj.images[0]} alt="Clicked image" title={`Likes: ${postObj.likes}, Comments: ${postObj.comments.length}`} />

          </div>
            <div className=' pl-[30px] right  pt-[20px] w-[45%] h-[100%]  '>   
            {/* Replace the existing img tag with the new one */}
            <div className='flex items-center gap-[20px]'>
            <img className=' rounded-[50px]  object-cover w-auto h-[60px]' src={postObj?.user?.avatar ? import.meta.env.VITE_APP_FILES_URL + postObj.user.avatar : fallbackAvatarURL} alt="User avatar" />
              <h1 className=' font-[600] text-[20px]'>{  postObj.user.userName}</h1>
                 <p className=' text-[20px] font-[700]'>.</p>
               <p className=' text-blue-600 text-[20px] font-[600]'> Fallow</p>
            </div>
 <div style={{overflow: "auto"}} className=' h-[40vh] '>

            {
              
postObj.comments.map((comment) => {
  // Find the user who made the comment
    const user = users.find(user => user.id === comment.userId);
   
    return ( 
      <div  key={comment.id} className='  mt-[30px] pt-[10px] comment-section'>
      
      <div   className='flex h-[40px]  items-center gap-[20px]'>
        <img className='avatar rounded-[50px]   h-[50px] ' src={user?.avatar ? import.meta.env.VITE_APP_FILES_URL + user.avatar : fallbackAvatarURL} alt="User avatar" />
        <h2 className=' hover:text-gray-500  font-[600] text-[20px]'>{user?.userName}</h2>
        <p className=' text-[20px] font-[500]'>{comment.comment}</p>

      </div>
      </div>
    );
  })
}
    </div>
    <div className=' flex gap-[20px]'>
    <svg onClick={()=> postObj.postLike(true)}  aria-label="Like" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="32" role="img" viewBox="0 0 24 24" width="34"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
    <svg aria-label="Comment" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="32" role="img" viewBox="0 0 24 24" width="34"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
    <svg aria-label="Share Post" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="32" role="img" viewBox="0 0 24 24" width="34"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
 <div className=' flex  ml-[340px] '>
     <svg aria-label="Save" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="32" role="img" viewBox="0 0 24 24" width="34"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
  </div>   
 
    </div>
       <div className=' flex'>
        {
            <h1 onClick={()=> postObj.postLike(true)} className=' text-[20px] font-[500] mt-[30px]'>{  postObj.postLikeCount} Likes</h1> 
        }
        </div>  

        <div className=' mt-[30px]'>
       <hr /><hr />
 <div className=' pt-[20px] flex'>
       <svg aria-label="Emoji" class="   mt-[10px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
          <input type="text"  className='w-[90%]' placeholder='      Add a commentn ....'/>
 </div>
        </div>
            </div>
        </div>
      </div>
    );
  };

  export default Modal;
