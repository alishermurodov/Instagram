import React, { useCallback, useEffect, useState } from "react";
import Stories from "./components/stories";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import userAvatar from "./img/userimage.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import Posts from "./components/Posts";
import LikeComment from "./components/LikeComment";
import FYP from "./components/FYP";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { axiosRequest, getToken } from "../../utilities/axiosRequest";

const Home = () => {
  const PostImagesApi = "http://65.108.148.136:8085/images";
  const userIdApi = "http://65.108.148.136:8085/userId";
  // const LikePostApi = "http://65.108.148.136:8085/Post/like-Post?id";

  const [post, setPost] = useState([]);
  const [postById, setPostById] = useState({});
  const [story, setStory] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [idx, setIdx] = useState(null); // const [postFavorites, setPostFavorites] = useState([]);
  const [userId, userUserId] = useState([]);
  const [commentModal, setCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  const PostId = getToken()?.pid;
  const Userid = getToken()?.uid;
  const getPost = async () => {
    try {
      const { data } = await axiosRequest.get(`Post/get-posts`);

      setPost(data.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  const getStories = async () => {
    try {
      const { data } = await axiosRequest.get(`Story/get-stories`);
      setStory(data.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  const deleteComment = async (id) => {
    console.log(id);
    try {
      const { data } = await axiosRequest.delete(
        `Post/delete_comment?commentId=${id}`
      );
      getPost();
      getPostComments();
      // setPostById();
    } catch (error) {}
  };
  const AddComment = async ({ comment, postId }) => {
    try {
      const { data } = await axiosRequest.post(`Post/add_comment`, {
        comment,
        postId,
      });
      getPost(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getPostComments = async () => {
    try {
      const { data } = await axiosRequest.get(`Post/get-post-comments`);
      setPostComments(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
    getStories();
    // getPostById();
  }, []);
  const PostLike = async (id) => {
    try {
      const { data } = await axiosRequest.post(`Post/like-Post?postId=${id}`);
      getPost(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const PostFavorites = async (id) => {
    let obj = {
      postId: id,
    };
    try {
      const { data } = await axiosRequest.post(`Post/add-PostFavorite`, obj);
      getPost();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  // const getPostFavorites = async () =>{
  //   try {
  //     const{data} = await axios
  //   } catch (error) {

  //   }
  // }
  const getUserId = async () => {
    try {
      const { data } = await axiosRequest.get(`User/get-users?id`);
      userUserId(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserId();
  }, []);

  const [more, setMore] = useState(false);
  const [moreModal, setMoreModal] = useState(false);
  const [storyModal, setStoryModal] = useState(false);
  const [storyById, setStoryById] = useState({});
  return (
    <div className="flex  dark:text-white  relative   w-[100%]  justify-center ">
      <div className="pb-20 md:w-[85%] lg:w-[60%]  w-[90%] ">
        <div className="w-[95%] md:w-[75%]  lg:w-[70%]  mx-auto  pt-10 ">
          <Swiper
            // spaceBetween={30}
            slidesPerGroupSkip={5}
            navigation={true}
            modules={[Navigation]}
            // centeredSlides={true}
            keyboard={{
              enabled: true,
            }}
            breakpoints={{
              300: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              540: {
                slidesPerView: 6,
                spaceBetween: 14,
              },
              724: {
                slidesPerView: 7,
                spaceBetween: 14,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 16,
              },
              1224: {
                slidesPerView: 8,
                spaceBetween: 18,
              },
              2024: {
                slidesPerView: 10,
                spaceBetween: 30,
              },
            }}
            className="mySwiper"
          >
            {story.map((e) => {
              return (
                <SwiperSlide
                  key={e.id}
                  className=" dark:bg-black rounded-full h-auto items-center"
                >
                  {e.userAvatar == null || e.userAvatar == "" ? (
                    <div className="bg-gradient-to-r  from-purple-500 rounded-[50%] p-[4%] via-pink-500 to-yellow-500 w-[76px] h-[52px]">
                      <div className="bg-white w-[100%] h-[100%] rounded-[50%]">
                        <img
                          onClick={() => {
                            setStoryModal(true);
                            setStoryById(e);
                          }}
                          src={userAvatar}
                          alt=""
                          className="w-[150px], h-[150px], p-[3%] rounded-[50%]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r  from-purple-500 rounded-[50%] p-[4%] via-pink-500 to-yellow-500 w-[76px] h-[52px]">
                      <div className="bg-white w-[100%] h-[100%] rounded-[50%]">
                        <img
                          onClick={() => {
                            setStoryModal(true);
                            setStoryById(e);
                          }}
                          src={`${import.meta.env.VITE_APP_FILES_URL}${
                            e.userAvatar
                          }`}
                          className="w-[100%] dark:bg-black p-[3%]  rounded-[100%]"
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {post.map((e, index) => {
          return (
            <div
              key={index}
              className="w-[80%] border-b pb-5 mb-5 dark:bg-black sm:w-[75%] md:w-[60%]  2xl:w-[52%] mx-auto mt-5"
            >
              <div className="flex items-center mb-2 justify-between">
                {userId.map((el) => {
                  if (el.id == e.userId) {
                    return (
                      <Link key={el.id} className="w-[50%]" to={"/profile"}>
                        <div
                          className="flex items-center gap-2 "
                          onTouchMoveCapture={() => setProfileModal()}
                        >
                          {el.avatar == null || el.avatar == "" ? (
                            <img
                              src={userAvatar}
                              alt=""
                              className="w-[20%] object-cover  dark:bg-black h-[150px], rounded-[50%] md:w-[15%] lg:w-[13%] xl:w-[15%]"
                            />
                          ) : (
                            <img
                              src={`${import.meta.env.VITE_APP_FILES_URL}${
                                el.avatar
                              }`}
                              className=" w-[20%]  h-10 object-cover rounded-full"
                              alt=""
                            />
                          )}

                          <p>
                            <Link
                              className="font-semibold"
                              to={"/home/profile"}
                            >{`${el.userName}`}</Link>
                            <span className="text-gray-400 text-xs ml-2">
                              {e.datePublished.slice(0, 10)}
                            </span>
                          </p>
                        </div>
                      </Link>
                    );
                  }
                })}

                <div
                  className=""
                  onClick={() => {
                    setMore(true);
                  }}
                >
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </div>
              </div>
              <div>
                <div>
                  <div className="h-[500px] border rounded-xl sm:h-[450px] md:h-[500px] 2xl:h-[550px]">
                    <Swiper
                      pagination={{
                        type: "fraction",
                      }}
                      navigation={true}
                      modules={[Pagination, Navigation]}
                      className="mySwiper"
                    >
                      {e.images.map((ell) => {
                        return (
                          <SwiperSlide className="dark:bg-black border-gray-800 rounded-xl">
                            <img
                              onDoubleClick={() => {
                                PostLike(e.postId);
                              }}
                              className="rounded object-cover h-10 dark:bg-black"
                              src={`${PostImagesApi}/${ell}`}
                              alt="img"
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <IconButton
                        className=""
                        onClick={() => {
                          PostLike(e.postId); // Toggle the value
                        }}
                      >
                        {/* {console.log(e.postFavorite)} */}
                        {e.postLike ? (
                          <span className="x1ykxiw6 x1ahuga x4hg4is x3oybdh">
                            <svg
                              ariaLabel="Не нравится"
                              className="x1lliihq x1n2onr6 xxk16z8 dark:text-white"
                              fill="red"
                              height="24"
                              role="img"
                              viewBox="0 0 48 48"
                              width="24"
                            >
                              <title>Не нравится</title>
                              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                            </svg>
                          </span>
                        ) : (
                          <svg
                            ariaLabel="Нравится"
                            className="x1lliihq x1n2onr6  dark:text-white"
                            color="rgb(38, 38, 38)"
                            fill="rgb(38, 38, 38)"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <title>Нравится</title>
                            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                          </svg>
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          // getPostById(e.postId);
                          setPostById(e);
                          setCommentModal(true);
                          getPostComments();
                        }}
                      >
                        <svg
                          ariaLabel="Комментировать"
                          className="x1lliihq x1n2onr6 dark:text-white"
                          color="rgb(38, 38, 38)"
                          fill="rgb(38, 38, 38)"
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
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      </IconButton>
                      <IconButton>
                        <svg
                          ariaLabel="Поделиться публикацией"
                          className="x1lliihq x1n2onr6 dark:text-white"
                          color="rgb(38, 38, 38)"
                          fill="rgb(38, 38, 38)"
                          height="24"
                          role="img"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <title>Поделиться публикацией</title>
                          <line
                            fill="none"
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            x1="22"
                            x2="9.218"
                            y1="3"
                            y2="10.083"
                          ></line>
                          <polygon
                            fill="none"
                            points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></polygon>
                        </svg>
                      </IconButton>
                    </div>
                    <div>
                      <IconButton
                        onClick={() => {
                          PostFavorites(e.postId);
                        }}
                      >
                        {e.postFavorite ? (
                          <svg
                            ariaLabel="Сохранить"
                            className="x1lliihq x1n2onr6 dark:text-white"
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
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></polygon>
                          </svg>
                        ) : (
                          <svg
                            ariaLabel="Удалить"
                            class="x1lliihq x1n2onr6 x5n08af dark:text-white"
                            fill="currentColor"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <title>Удалить</title>
                            <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
                          </svg>
                        )}
                      </IconButton>
                    </div>
                  </div>
                  <div className="w-[98%] mx-auto">
                    {userId.map((el) => {
                      if (el.id == e.userId) {
                        return (
                          <>
                            <p className="font-semibold ">
                              {e.postLikeCount < 0
                                ? e.postLikeCount * -1
                                : e.postLikeCount}
                              <span className="mx-[3px]"></span>
                              отметок{" "}
                              <span className="font-bold">"Нравится"</span>
                            </p>
                            <p>
                              <span className="font-semibold  mr-2">{`${el.userName}`}</span>
                              {e.title}
                              <br />
                              {e.content}
                            </p>
                          </>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[20%] hidden lg:block  pt-14">
        <div className="w-[100%] grid   gap-5">
          <FYP />
          <p className=" gap-8 w-[90%] mx-auto">
            Рекомендации для вас <span className="">Все</span>{" "}
          </p>
          <FYP></FYP>
          <FYP />
          <FYP />
          <FYP />
        </div>
        <div className="text-xs text-gray-300 inline mt-10 leading-6 selection:first-letter:">
          <p className="inline">
            Информация Помощь <br /> Пресса API Вакансии Конфиденциальность
            <br /> Условия Места Язык Meta Verified <br /> © 2023 INSTAGRAM FROM
            META
          </p>
        </div>
      </div>
      {more ? (
        <div
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
          className="fixed  top-0 left-0 w-[100%] z-50 pt-10 h-[100vh] grid"
        >
          <div className="grid  modal-content dark:border overflow-auto dark:shadow-2xl dark:bg-[#1c1e21] rounded-2xl">
            <button className="hover:bg-gray-300 text-red-600 font-bold rounded-2xl p-5">
              Пожаловаться
            </button>
            {/* <button
              onClick={() => {
                deleteComment(idx);
                setMore(false);
              }}
              className="hover:bg-gray-300 text-red-600 font-bold  p-5"
            >
              Delete
            </button> */}
            <button className="hover:bg-gray-300 text-red-500 font-semibold  p-5">
              Отменить подписку
            </button>
            <button className="hover:bg-gray-300  p-5">
              Добавить в избранное
            </button>
            <button className="hover:bg-gray-300  p-5">Поделиться…</button>
            <button className="hover:bg-gray-300  p-5">
              Копировать ссылку
            </button>
            <button className="hover:bg-gray-300  p-5">Об аккаунте</button>
            <button
              className="hover:bg-gray-300  p-5 rounded-2xl"
              onClick={() => {
                setMore(false);
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : null}
      {moreModal ? (
        <div
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
          className="fixed  top-0 left-0 w-[100%] z-50 pt-10 h-[100vh] grid"
        >
          <div className="grid  modal-content dark:border overflow-auto dark:shadow-2xl dark:bg-[#1c1e21] rounded-2xl">
            <button className="hover:bg-gray-300 text-red-600 font-bold rounded-2xl p-5">
              Пожаловаться
            </button>
            <button
              onClick={() => {
                deleteComment(idx);
                setMoreModal(false);
              }}
              className="hover:bg-gray-300 text-red-600 font-bold  p-5"
            >
              Delete
            </button>

            <button className="hover:bg-gray-300  p-5">
              Добавить в избранное
            </button>
            <button className="hover:bg-gray-300  p-5">Поделиться…</button>
            <button className="hover:bg-gray-300  p-5">
              Копировать ссылку
            </button>
            <button className="hover:bg-gray-300  p-5">Об аккаунте</button>
            <button
              className="hover:bg-gray-300  p-5 rounded-2xl"
              onClick={() => {
                setMoreModal(false);
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : null}
      {commentModal ? (
        <div
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
          className="fixed  top-0 left-0 w-[100%] z-10 h-[100vh] grid"
        >
          <span
            onClick={() => {
              setCommentModal(false);
            }}
            className="text-gray-200 cursor-pointer justify-self-end text-4xl mr-3"
          >
            &times;
          </span>
          <div className=" w-[1200px]  modal-content">
            <div className="overflow-auto grid grid-cols-2  h-[620px]   bg-black ">
              <div className="self-center h-[620px]">
                <div className="h-[620px]">
                  <Swiper
                    pagination={{
                      type: "fraction",
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {postById?.images?.map((ell) => {
                      return (
                        <SwiperSlide className="dark:bg-black">
                          <img
                            onDoubleClick={() => {
                              PostLike(ell?.postId);
                            }}
                            src={`${import.meta.env.VITE_APP_FILES_URL}${ell}`}
                            className=" self-center object-cover  h-[620px] items-center w-[100%]"
                            alt=""
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
              <div className="py-3  px-3 bg-white">
                <div className="top flex justify-between items-center">
                  <span className=" ">
                    {userId?.map((e) => {
                      if (postById?.userId == e?.id) {
                        return (
                          <div className="flex items-center gap-4 ">
                            {e?.avatar == null || e.avatar == "" ? (
                              <img
                                src={userAvatar}
                                alt=""
                                className="w-[10%]"
                              />
                            ) : (
                              <img
                                src={`${import.meta.env.VITE_APP_FILES_URL}${
                                  e?.avatar
                                }`}
                                className="w-[23%] h-10  object-cover rounded-full"
                                alt=""
                              />
                            )}
                            <span className="text-md font-semibold">
                              {e?.userName}
                            </span>
                          </div>
                        );
                      }
                    })}
                  </span>
                  <div
                    className=""
                    onClick={() => {
                      setMore(true);
                    }}
                  >
                    <IconButton>
                      <MoreHorizIcon />
                    </IconButton>
                  </div>
                </div>
                <div className="overflow-auto h-[420px]  grid gap-5 px-10 py-10">
                  {postComments?.map((e) => {
                    if (post?.userId == postComments.userId) {
                      console.log(e);
                      return (
                        <>
                          <div className="flex flex-wrap justify-between items-center">
                            <div className="w-[45%]">
                              {userId?.map((el) => {
                                if (e?.userId == el?.id) {
                                  return (
                                    <div>
                                      <Link
                                        key={el?.id}
                                        className="w-[10%]"
                                        to={"home/profile"}
                                      >
                                        <div
                                          className="flex items-center gap-2 "
                                          onTouchMoveCapture={() =>
                                            setProfileModal()
                                          }
                                        >
                                          {el.avatar == null ||
                                          el.avatar == "" ? (
                                            <img
                                              src={userAvatar}
                                              alt=""
                                              className="w-[20%]"
                                            />
                                          ) : (
                                            <img
                                              src={`${
                                                import.meta.env
                                                  .VITE_APP_FILES_URL
                                              }${el?.avatar}`}
                                              className="w-[20%] h-10 object-cover rounded-full"
                                              alt=""
                                            />
                                          )}

                                          <p>
                                            <Link
                                              className="font-semibold"
                                              to={"/home/profile"}
                                            >{`${el?.userName}`}</Link>

                                            <span className="text-gray-400 ml-2">
                                              {e?.dateCommented.slice(5, 10)}
                                            </span>
                                          </p>
                                        </div>
                                      </Link>
                                    </div>
                                  );
                                }
                                return;
                              })}
                            </div>
                            <div>{e.comment}</div>

                            <div
                              className=""
                              onClick={() => {
                                setMoreModal(true), setIdx(e.postCommentId);
                              }}
                            >
                              <IconButton>
                                <MoreHorizIcon />
                              </IconButton>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <div>
                      <IconButton
                        className=""
                        onClick={() => {
                          PostLike(postById.postId); // Toggle the value
                        }}
                      >
                        {postById.postLike ? (
                          <span className="x1ykxiw6 x1ahuga x4hg4is x3oybdh">
                            <svg
                              aria-label="Не нравится"
                              className="x1lliihq x1n2onr6 xxk16z8 "
                              fill="red"
                              height="24"
                              role="img"
                              viewBox="0 0 48 48"
                              width="24"
                            >
                              <title>Не нравится</title>
                              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                            </svg>
                          </span>
                        ) : (
                          <svg
                            aria-label="Нравится"
                            className="x1lliihq x1n2onr6 xxk16z8 dark:text-white"
                            color="rgb(38, 38, 38)"
                            fill="rgb(38, 38, 38)"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <title>Нравится</title>
                            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                          </svg>
                        )}
                      </IconButton>
                      <IconButton onClick={() => {}}>
                        <svg
                          aria-label="Комментировать"
                          className="x1lliihq x1n2onr6 dark:text-white"
                          color="rgb(38, 38, 38)"
                          fill="rgb(38, 38, 38)"
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
                          ariaLabel="Поделиться публикацией"
                          className="x1lliihq x1n2onr6 dark:text-white"
                          color="rgb(38, 38, 38)"
                          fill="rgb(38, 38, 38)"
                          height="24"
                          role="img"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <title>Поделиться публикацией</title>
                          <line
                            fill="none"
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="2"
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
                      <IconButton
                        onClick={() => {
                          PostFavorites(e.postFavorite);
                        }}
                      >
                        {postById?.postFavorite ? (
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
                        ) : (
                          <svg
                            aria-label="Удалить"
                            class="x1lliihq x1n2onr6 x5n08af"
                            fill="currentColor"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <title>Удалить</title>
                            <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
                          </svg>
                        )}
                      </IconButton>
                    </div>
                  </div>
                  <div className="ml-2 flex">
                    {userId.map((el) => {
                      if (el.id == postById.userId) {
                        return (
                          <>
                            <p className="font-semibold ">
                              {postById.postLikeCount < 0
                                ? postById.postLikeCount * -1
                                : postById.postLikeCount}
                              <span className="mx-[3px]"></span>
                              отметок "Нравится"
                            </p>
                          </>
                        );
                      }
                    })}
                  </div>
                  <div className="border-t justify-between px-10 mt-5 pt-1 flex items-center ">
                    <input
                      type="text"
                      value={comment}
                      placeholder="Add a comment"
                      onChange={(event) => {
                        setComment(event.target.value);
                      }}
                      className="outline-none w-[80%]   py-2.5 overflow-auto "
                    />
                    <button>
                      {comment.trim().length == 0 ? (
                        <div className="text-blue-100">Post</div>
                      ) : (
                        <div
                          onClick={() => {
                            AddComment({
                              comment: comment,
                              postId: postById.postId,
                            });
                            setComment("");
                          }}
                          className="text-blue-500"
                        >
                          Post
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {storyModal ? (
        <div
          style={{ background: "rgba(26, 26, 26)" }}
          className="fixed top-0 left-0 w-[100%] z-10 h-[100vh] grid"
        >
          <div className="flex justify-between px-5 pt-10">
            <Link
              to={"/home"}
              onClick={() => {
                setStoryModal(false);
              }}
            >
              <span className="cursor-pointer">
                <svg
                  aria-label="Instagram"
                  class="x1lliihq x1n2onr6"
                  color="white"
                  fill="rgb(0, 0, 0)"
                  height="29"
                  role="img"
                  viewBox="32 4 113 32"
                  width="103"
                >
                  <title>Instagram</title>
                  <path
                    clip-rule="evenodd"
                    d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </Link>
            <span
              onClick={() => {
                setStoryModal(false);
              }}
              className="text-gray-200 cursor-pointer justify-self-end text-4xl "
            >
              &times;
            </span>
          </div>
          <div className=" modal-content2">
            {console.log(storyById)}

            <img
              onClick={() => {
                setStoryModal(true);
                setStoryById(e);
              }}
              src={`${import.meta.env.VITE_APP_FILES_URL}${storyById.fileName}`}
              className="w-auto dark:bg-black h-[600px] object-cover  rounded-2xl "
              alt=""
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
