
import React, { useEffect, useState } from 'react'

import OceanWave from '../../assets/ReelsImg/userIcon.png'
import userIcon from '../../assets/ReelsImg/userIcon.png'
import userImage from '../../assets/ReelsImg/userImage.png'
import { axiosRequest, getToken } from '../../utilities/axiosRequest'

const Reels = () => {
  const myid = getToken().sid


  const [commentModal, setCommentModal] = useState(false)
  // getReel 
  const [reel, setReel] = useState([])
  const [sendModal, setSendModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const [like, setLike] = useState(false)
  const [reelobj, setReelObj] = useState([])
  const [ObjUser, setObjUser] = useState({})
  const [idRender, setIdRender] = useState(null)
  // console.log(reel)
  // getComment 
  const [commentory, setCommentory] = useState([])
  const [addComm, setAddComm] = useState("")
  const [objPost, setObjPost] = useState({})

  //getUsers
  const [users, setUsers] = useState([])

  // getReel 
  const getReels = async () => {
    try {
      const { data } = await axiosRequest.get("Post/get-posts")
      // console.log(data.data)
      setReel(data.data.reverse())
      setObjPost(data.data.find((e) => e.postId == idRender))
    } catch (error) {
      console.error(error);
    }
  }
  // console.log(reel.comments);

  const addComment = async (postID) => {
    try {
      let obj = {
        "comment": addComm,
        "postid": postID
      }
      const { data } = await axiosRequest.post(`Post/add_comment`, obj)
      // getComment()
      // setAddComm("")
      // getReels()
      // console.log(data);
      // setCommentory([...commentory, data.data]);
      setAddComm("");
      getComment()
      setReelObj([...reelobj,
      {
        "comment": addComm,
        "postid": postID
      }
      ])
      // getReels();
    } catch (error) {
      console.error(error);
    }
  }


  // like 
  const likePost = async (id) => {
    try {
      const { data } = await axiosRequest.post(`Post/like-Post?postId=${id}`)
      getReels(data.data)
      // setLike(true)
    } catch (error) {
    }
  }


  //getUser
  const getUser = async () => {
    try {
      const { data } = await axiosRequest.get("/User/get-users")
      // console.log(data.data);
      setUsers(data.data)
    } catch (error) {
      console.error(error);
    }
  }

  // getComment 
  const getComment = async () => {
    try {
      const { data } = await axiosRequest.get("Post/get-post-comments?PageSize=300")
      setCommentory(data.data)
      // console.log(data.data);
      getReels()
    } catch (error) {
      console.error(error);
    }
  }

  // getUsersById

  // function openModalComment(post, user, id) {
  //   setCommentModal(true)
  //   setReelObj(post)
  //   setObjUser(user)
  //   setIdRender(id)
  // }

  async function deletecoment(id, logic) {
    if (logic) {
      try {
        let { data } = await axiosRequest.delete(`Post/delete_comment?commentId=${id}`)
        getComment()
      } catch (error) {

      }
    }

    let ar = reelobj.filter((e) => {
      return id != e.postCommentId
    })
    setReelObj(ar)
  }

  // postFavoutite 
  async function savepost(saveid) {
    try {
      let objsave = {
        "postId": saveid
      }
      const { data } = await axiosRequest.post(`Post/add-PostFavorite`, objsave)
      getReels()
      console.log(data);
    } catch (error) {

    }
  }


  useEffect(() => {
    getReels()
    getUser()
    getComment()
    // getPostById()
  }, [])

  return (
    <>
      <div className='text-[#fff] w-[33%] mx-auto pt-[35px] '>


        {

          reel.map((e) => {
            let thisUser = users.find((element) => element.id == e?.userId)
            return (
              <div key={e.postId} className="w-full h-[87vh]  rounded-[20px] flex items-end gap-[0px] mb-[40px] bg-[]">
                <div className="w-[85%] md:rounded-[6px] overflow-hidden bg-black h-[100%] flex items-center" style={{ boxShadow: "0 0 40px 0 #535252" }}>
                  <img onDoubleClick={() => likePost(e.postId)} className='mx-auto' src={`${import.meta.env.VITE_APP_FILES_URL}${e.images[0]}`} alt="" />
                </div>
                <div className="w-[15%] dark:flex flex-col items-center text-center hidden">
                  <div onClick={() => likePost(e.postId)} className="mb-[15px]">
                    {

                      e.postLike ?
                        (e.postLikeCount * (-1)) + 1
                        &&
                        <svg aria-label="Ненравится" className='cursor-pointer' class="x1lliihq x1n2onr6" color="rgb(255, 48, 64)" fill="rgb(255, 48, 64)" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Не нравится</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                        :
                        <svg aria-label="Нравится" className='cursor-pointer' class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Нравится</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>

                    }
                    <p className='text-[12px]'>{e.postLikeCount < 0 ? e.postLikeCount * (-1) : e.postLikeCount}</p>
                  </div>
                  <div onClick={() => {
                    // setCommentModal(true)
                    setReelObj(e.comments)
                    setCommentModal(true)

                    setIdRender(e.postId)
                  }} className="mb-[15px]">
                    <svg aria-label="Комментировать" class="x1lliihq x1n2onr6" className='cursor-pointer' color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Комментировать</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                    <p className='text-[12px]'>{e.commentCount}</p>
                  </div>
                  <div onClick={() => setSendModal(true)} className="mb-[15px]">
                    <svg aria-label="Отправить в сообщении" class="x1lliihq x1n2onr6" className='cursor-pointer' color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Отправить в сообщении</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                  </div>
                  <div className="mb-[25px]">

                    {
                      e.postFavorite ?
                        <svg onClick={() => savepost(e.postId)} aria-label="Сохранить" class="x1lliihq x1n2onr6" className='cursor-pointer' color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Сохранить</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                        :
                        <svg onClick={() => savepost(e.postId)} aria-label="Удалить" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Удалить</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>
                    }
                  </div>
                  <div onClick={() => setSettingsModal(true)} className="mb-[25px]">
                    <svg aria-label="Ещё" class="x1lliihq x1n2onr6" className='cursor-pointer' color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Ещё</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                  </div>
                  <div className="overflow-hidden w-[50%]">
                    <img src={userIcon} alt="" style={{ width: '30px', height: '30px', borderRadius: '3px' }} />
                  </div>
                </div>
                <div className="w-[15%] flex flex-col items-center text-center dark:hidden">
                  <div onClick={() => likePost(e.postId)} className="mb-[15px]">
                    {

                      e.postLike ?
                        (e.postLikeCount * (-1)) + 1
                        &&
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} fill="red" viewBox="0 0 24 24" strokeWidth={4} stroke="red" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        :
                        <svg aria-label="Нравится" className='cursor-pointer' style={{ color: '#000', cursor: 'pointer' }} class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(0,0,0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Нравится</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                    }
                    <p className='text-[12px] text-[#000]'>{e.postLikeCount < 0 ? e.postLikeCount * (-1) : e.postLikeCount}</p>
                  </div>
                  <div onClick={() => {
                    setCommentModal(true)

                    setReelObj(e.comments)
                    setIdRender(e.postId)
                  }} className="mb-[15px]">
                    <svg aria-label="Комментировать" class="x1lliihq x1n2onr6" className='cursor-pointer' color="rgb(0,0,0)" fill="rgb(0,0,0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Комментировать</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                    <p className='text-[12px] text-[#000]'>{e.commentCount}</p>
                  </div>
                  <div onClick={() => setSendModal(true)} className="mb-[15px]">
                    <svg aria-label="Отправить в сообщении" class="x1lliihq x1n2onr6" className='cursor-pointer' color="rgb(0,0,0)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Отправить в сообщении</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                  </div>
                  <div className="mb-[25px]">
                    {
                      e?.postLike ?
                        <svg onClick={() => savepost(e.postId)} aria-label="Сохранить" class="x1lliihq x1n2onr6" className='cursor-pointer' color="rgb(0,0,0)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Сохранить</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                        :
                        <svg onClick={() => savepost(e.postId)} aria-label="Удалить" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="#000" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Удалить</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>
                    }
                  </div>
                  <div onClick={() => setSettingsModal(true)} className="mb-[25px]">
                    <svg aria-label="Ещё" class="x1lliihq x1n2onr6" className='cursor-pointer' color="rgb(0,0,0)" fill="rgb(0,0,0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Ещё</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                  </div>
                  <div className="overflow-hidden w-[50%]">
                    <img src={userIcon} alt="" style={{ width: '30px', height: '30px', borderRadius: '3px' }} />
                  </div>
                </div>


              </div>
            )
          })


        }




        {
          commentModal ?
            <div className="bg-[#201f1f] fixed top-[80px] right-[80px] w-[22%] rounded-[7px]">
              <div className="flex items-center gap-[50px] py-[24px] px-[24px]">
                <svg onClick={() => setCommentModal(false)} style={{ cursor: 'pointer' }} aria-label="Закрыть" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Закрыть</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
                <p className='font-[600]'>Коментарии</p>
              </div>
              <div className="h-[230px] p-[12px] overflow-auto">
                {
                  reelobj?.map((comment) => {
                    // console.log(comment.userId)
                    // let userProfile = users.find((u) => u.id == comment.userId)
                    // console.log(userProfile)
                    console.log(comment)
                    return (
                      <div className='flex gap-[20px] mb-[19px]'>
                        {
                          <img className='rounded-[50%] w-[40px] h-[40px] bg-[#000] text-center text-[13px]' src={
                            `${import.meta.env.VITE_APP_FILES_URL}${users.find((u) => u.id == comment.userId)?.avatar}`
                          } alt="user" />
                        }

                        {/* {
                          users?.map((e) => {
                            return (
                              e?.avatar == null || e?.avatar == '' && e.id == comment?.userId ?
                                <img className='rounded-[50%] w-[40px] h-[40px]' src={userImage} alt="" />
                                :
                                <img className='rounded-[50%] w-[40px] h-[40px]' src={
                                  `${import.meta.env.VITE_APP_FILES_URL}${users.find((u) => u.id == comment.userId)?.avatar}`
                                } alt="" />
                            )
                          })
                        } */}

                        <div className="">
                          <p className='font-bold'>{users.find((u) => u.id == comment.userId)?.userName}</p>
                          <div className="">
                            <p>{comment?.comment}</p>
                            <button className='text-[11px] bg-[grey]' onClick={() => {
                              deletecoment(comment?.postCommentId, comment?.userId == myid)
                              getComment()

                            }}>delete</button>
                          </div>
                        </div>
                      </div>

                    )

                  })
                }
              </div>

              <div className="w-[86%] mx-auto py-[15px]">
                <input value={addComm} onChange={(e) => setAddComm(e.target.value)} type="text" className='w-full h-[35px] pl-[20px] rounded-[20px] bg-[#000] border-[1px] border-[#fff]' />
                {
                  addComm.trim().length == 0 ?
                    <button style={{ display: addComm.trim().length > 0 ? 'block' : 'none' }} disabled={true} onClick={() => addComment(idRender)} className='absolute bottom-[25px] right-[32px] text-[13px] font-bold ml-[8px] text-[grey]'>Опубликовать</button>
                    :
                    <button style={{ display: addComm.trim().length > 0 ? 'block' : 'none' }} onClick={() => addComment(idRender)} className='absolute bottom-[25px] right-[32px] text-[13px] font-bold ml-[8px] text-[#0095f6]'>Опубликовать</button>
                }
                {
                  // console.log(reelobj.postId)
                }
              </div>
            </div> : null
        }

        {
          sendModal ?
            <div className="bg-[#201f1f] fixed top-[80px] right-[80px] w-[22%] rounded-[7px]">
              <div className="flex items-center gap-[50px] py-[24px] px-[24px]">
                <svg onClick={() => setSendModal(false)} aria-label="Закрыть" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Закрыть</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
                <p className='font-[600]'>Поделиться</p>
              </div>
              <div className="h-[230px] overflow-auto">
                {
                  users.map((e) => {
                    console.log(`${import.meta.env.VITE_APP_FILES_URL}${users.avatar}`)
                    return (
                      <div className="">

                      </div>
                    )
                  })
                }
              </div>
              <div className="w-[86%] mx-auto py-[15px]">
                {/* <input type="text" className='w-full h-[35px] pl-[20px]  border-[1px] border-[#fff]'/> */}
                <button className='w-full h-[35px] rounded-[7px] bg-[#3b88b8] text-[#fff]'>Отправить</button>
              </div>
            </div> : null
        }
        {
          settingsModal ?
            <div className="bg-[#201f1f] fixed top-[220px] right-[140px] w-[19%] rounded-[7px] p-[.4%]">
              <div className='transition-all duration-[.3s] hover:bg-[#313030] rounded-[10px] cursor-pointer mx-auto h-[46px] pl-[20px] font-[600] flex items-center justify-between text-[#ae3b3b]'>Пожаловаться <span onClick={() => setSettingsModal(false)} className='text-[#888] pr-[20px]'>X</span></div>
              <div className='transition-all duration-[.3s] hover:bg-[#313030] rounded-[10px] cursor-pointer mx-auto h-[46px] pl-[20px] font-[600] flex items-center text-[#5a74da]'>Подписаться</div>
              <div className='transition-all duration-[.3s] hover:bg-[#313030] rounded-[10px] cursor-pointer mx-auto h-[46px] pl-[20px] font-[600] flex items-center'>Перейти к публикации</div>
              <div className='transition-all duration-[.3s] hover:bg-[#313030] rounded-[10px] cursor-pointer mx-auto h-[46px] pl-[20px] font-[600] flex items-center'>Поделиться...</div>
              <div className='transition-all duration-[.3s] hover:bg-[#313030] rounded-[10px] cursor-pointer mx-auto h-[46px] pl-[20px] font-[600] flex items-center'>Копировать ссылку</div>
              <div className='transition-all duration-[.3s] hover:bg-[#313030] rounded-[10px] cursor-pointer mx-auto h-[46px] pl-[20px] font-[600] flex items-center'>Вставить на сайт</div>
              <div className='transition-all duration-[.3s] hover:bg-[#313030] rounded-[10px] cursor-pointer mx-auto h-[46px] pl-[20px] font-[600] flex items-center'>Об аккаунте</div>
            </div> : null
        }
      </div>
    </>
  )


}

export default Reels