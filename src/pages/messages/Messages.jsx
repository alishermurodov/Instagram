import React, { useEffect, useState } from "react";
import { Box, IconButton, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import TemporaryDrawer from "../../components/Drawer";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { axiosRequest, getToken } from "../../utilities/axiosRequest";
import imageee from "../../assets/icon-256x256.png";
import Icon1 from "./Icon1";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  pb: 3,
};

const Messages = () => {
  const myId = getToken().sid;
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState([]);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState([]);
  const [ChatId, setChatId] = useState();
  const [modal, setModal] = useState(false);
  const [user1, setuser1] = useState();
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = useState();
  const [text, setText] = useState("");
  const [chatIdx, setChatIdx] = useState(null);
  const [ChatById, setChatById] = useState([]);
  const [deleteidx, setdeleteidx] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const [open3, setOpen3] = React.useState(false);

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };
  const [open4, setOpen4] = React.useState(false);

  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  // getUser
  async function getUser() {
    try {
      let { data } = await axiosRequest.get("User/get-users");
      setUser(data.data);
      // console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // getChat
  async function getChat() {
    try {
      const { data } = await axiosRequest.get(`Chat/get-chats`);
      setChat(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  // getmessages
  async function getMessage(id) {
    console.log(id);
    try {
      let { data } = await axiosRequest.get(`Chat/get-chat-by-id?chatId=${id}`);
      setMessage(data.data.reverse());
      setChatById(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // deletemessage
  async function deleteMessage(id) {
    try {
      let { data } = await axiosRequest.delete(
        `Chat/delete-message?massageId=${id}`
      );
      getMessage(chatIdx);
      handleClose4();
    } catch (error) {
      console.log(error);
    }
  }

  // n
  async function sendMessage() {
    if (text.trim().length > 0) {
      try {
        console.log(chatIdx);
        // console.log(text);
        const obj = {
          chatId: chatIdx,
          messageText: text,
        };
        const { data } = await axiosRequest.put(`Chat/send-message`, obj);
        getMessage(chatIdx);
        console.log(data.data);
        setText("");
      } catch (error) {
        console.log(error);
      }
    } else {
      getMessage(chatIdx);
      alert("Please enter your message");
    }
  }

  // postChat
  async function postChat(id) {
    try {
      const { data } = await axiosRequest.post(
        `Chat/create-chat?resceiveUserId=${id}`
      );
      console.log(data?.data);
      setChatId(data?.data);
      setOpen2(false);
      setModal(true);
      setChat(data.data);
      setSearchText("");
      getChat();
      setChatIdx(data?.data);
    } catch (error) {
      console.log(error);
    }
  }
  const userii = user.find((e) => e.id === userId);
  useEffect(() => {
    getUser();
    getChat();
  }, []);
  return (
    <div className="flex justify-end dark:bg-inherit dark:text-[white]">
      <div className="w-[100%] flex justify-center">
        <div className="lg:w-[38%] border-[1px]">
          <div className="sticky z-[1] ">
            <div className="flex items-center justify-between lg:px-[30px] py-[17px] pt-[32px]">
              <h1 className="text-[24px] font-bold hidden xl:block">
                muhammadsurur__
              </h1>
              <div className="flex justify-center m-auto">
                <div className="m-auto">
                  <button onClick={handleOpen2}>
                    <IconButton>
                      <svg
                        aria-label="Новое сообщение"
                        class="x1lliihq x1n2onr6"
                        color="rgb(0, 0, 0)"
                        fill="rgb(0, 0, 0)"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Новое сообщение</title>
                        <path
                          d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                        <path
                          d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                        <line
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          x1="16.848"
                          x2="20.076"
                          y1="3.924"
                          y2="7.153"
                        ></line>
                      </svg>
                    </IconButton>
                  </button>
                  <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    sx={{ marginLeft: "auto" }}
                  >
                    <Box
                      sx={{
                        ...style,
                        width: "60%",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <div className="flex items-center py-[25px] justify-between px-[80px]">
                        <h1 className="text-[24px] font-medium items-center">
                          Новое сообщение
                        </h1>
                        <div
                          className="flex justify-end"
                          onClick={() => handleClose2()}
                        >
                          <svg
                            aria-label="Закрыть"
                            class="x1lliihq x1n2onr6"
                            color="rgb(0, 0, 0)"
                            fill="rgb(0, 0, 0)"
                            height="18"
                            role="img"
                            viewBox="0 0 24 24"
                            width="18"
                          >
                            <title>Закрыть</title>
                            <polyline
                              fill="none"
                              points="20.643 3.357 12 12 3.353 20.647"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="3"
                            ></polyline>
                            <line
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="3"
                              x1="20.649"
                              x2="3.354"
                              y1="20.649"
                              y2="3.354"
                            ></line>
                          </svg>
                        </div>
                      </div>
                      <div className="flex gap-[16px] border-y-[1px] w-[100%] px-[20px] py-[5px]">
                        <h1 className="text-[20px] font-medium">Кому:</h1>
                        <input
                          value={searchText}
                          onChange={(event) =>
                            setSearchText(event.target.value)
                          }
                          className="w-[60%] lg:w-[95%] outline-none text-[20px] font-medium"
                          type="search"
                          placeholder="Поиск...."
                        />
                      </div>
                      <div
                        className="px-[30px] py-[40px] h-[25vh]"
                        style={{ overflow: "auto" }}
                      >
                        {searchText == "" ? (
                          <h1>Аккаунты не найдены.</h1>
                        ) : (
                          <div className="">
                            {user
                              ?.filter((e) =>
                                e?.userName
                                  ?.toLowerCase()
                                  ?.includes(
                                    searchText?.toLowerCase() ||
                                      e?.email
                                        ?.toLowerCase()
                                        ?.includes(searchText?.toLowerCase())
                                  )
                              )
                              .map((e) => {
                                // console.log(e,"iddd");
                                return (
                                  <div
                                    onClick={() => {
                                      setUserId(e.id);
                                      postChat(e.id);
                                      setModal(false);
                                      console.log(e);
                                    }}
                                    className="flex items-center gap-[10px] py-[10px] px-[30px]  hover:bg-[#e6e6e6] rounded-[20px]"
                                    key={e.id}
                                  >
                                    {e.avatar == null || e.avatar == "" ? (
                                      <img
                                        className="w-[80px] h-[80px] object-cover"
                                        src={imageee}
                                        alt={"profile"}
                                      />
                                    ) : (
                                      <img
                                        className="w-[80px] h-[80px] rounded-[50%] object-cover"
                                        src={`${
                                          import.meta.env.VITE_APP_FILES_URL
                                        }${e?.avatar}`}
                                        alt={"profile"}
                                      />
                                    )}
                                    <div className="">
                                      <h1 className="text-[19px] font-nornal">
                                        {e.userName}
                                      </h1>
                                      <h1>{e.email}</h1>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                      <div className=" w-[94%] m-auto">
                        <button className="bg-[#A7D1EC] text-[23px] font-bold hover:bg-[#3f99d2] text-[white] w-[100%] py-[5px] rounded-[10px] m-auto">
                          Чат
                        </button>
                      </div>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="md:flex justify-between md:px-[30px] hidden md:block">
              <h1 className="text-[18px] font-bold">Сообщения</h1>
              <h1 className="text-[#969696] font-medium">Запросы</h1>
            </div>
          </div>
          <div
            className="mt-[10px] h-[82vh] px-[20px]"
            style={{ overflow: "auto" }}
          >
            {chat?.length > 0 &&
              chat?.map((e) => {
                let currentUser = user.find((us) => e.receiveUserId === us.id);
                // console.log(e.);
                return (
                  <div
                    onClick={() => {
                      // setUserId(e.id);
                      // getMessage();
                      getMessage(e.chatId);
                    }}
                    className="flex items-center gap-[10px] py-[15px] px-[40px] rounded-[20px] hover:bg-[#d2d2d2]"
                    key={e.chatId}
                  >
                    {currentUser?.avatar == null ||
                    currentUser?.avatar == "" ? (
                      <img
                        onClick={() => handleOpen3}
                        className="w-[80px] h-[80px] object-cover"
                        src={imageee}
                        alt={"profile"}
                      />
                    ) : (
                      <img
                        onClick={() => handleOpen3}
                        className="w-[80px] h-[80px] rounded-[50%] object-cover"
                        src={`${import.meta.env.VITE_APP_FILES_URL}${
                          currentUser?.avatar
                        }`}
                        alt={"profile"}
                      />
                    )}

                    <div className="">
                      <h1 className="text-[19px] font-nornal">
                        {currentUser?.userName}
                      </h1>
                      <h1>{currentUser?.email}</h1>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {modal ? (
          <div className="w-[100%] md:w-[70%] lg:w-[62%] ">
            <div className="flex items-center border-[1px] justify-between px-[20px] sticky z-[1] ">
              <div className="flex items-center gap-[15px] text-[20px] font-semibold">
                <div className="bg-[gray]">
                  <Modal
                    open={open3}
                    onClose={handleClose3}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    sx={{ marginLeft: "auto" }}
                  >
                    <Box
                      sx={{
                        ...style,
                        width: "30%",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      {userii.avatar == null || userii.avatar == "" ? (
                        <img
                          className="w-[80%] h-[40%] bg-cover m-auto py-[40px] object-cover"
                          src={imageee}
                          alt={"profile"}
                        />
                      ) : (
                        <img
                          className="w-[80%] h-[40%] bg-cover object-cover m-auto py-[40px]"
                          src={`${import.meta.env.VITE_APP_FILES_URL}${
                            userii?.avatar
                          }`}
                          alt={"profile"}
                        />
                      )}
                    </Box>
                  </Modal>
                </div>
                <div className="" onClick={setOpen3}>
                  {userii.avatar == null || userii.avatar == "" ? (
                    <img
                      className="m-auto rounded-[50%] my-[20px] w-[80px] h-[80px] object-cover"
                      src={imageee}
                      alt={"profile"}
                    />
                  ) : (
                    <img
                      className="m-auto my-[20px] w-[80px] h-[80px] rounded-[50%] object-cover"
                      src={`${import.meta.env.VITE_APP_FILES_URL}${
                        userii?.avatar
                      }`}
                      alt={"profile"}
                    />
                  )}
                </div>
                <h1 className="lg:flex gap-[10px] hidden lg:block">
                  {userii.userName}
                </h1>
              </div>
              <div className="flex items-center gap-[5px] lg:gap-[20px]">
                <IconButton>
                  <svg
                    aria-label="Голосовой вызов"
                    class="x1lliihq x1n2onr6"
                    color="rgb(0, 0, 0)"
                    fill="rgb(0, 0, 0)"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Голосовой вызов</title>
                    <path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path>
                  </svg>
                </IconButton>
                <IconButton>
                  <Icon1 />
                </IconButton>
                <TemporaryDrawer chatId={chatIdx} getChatt={getChat} sendmodal={setModal} />
              </div>
            </div>
            <div className=" h-[80vh]" style={{ overflow: "auto" }}>
              <div className="text-center py-[50px] ">
                {userii.avatar == null || userii.avatar == "" ? (
                  <img
                    className="m-auto rounded-[50%] my-[20px] w-[80px] h-[80px]"
                    src={imageee}
                    alt={"profile"}
                  />
                ) : (
                  <img
                    className="m-auto my-[20px] w-[80px] h-[80px] rounded-[50%] object-cover"
                    src={`${import.meta.env.VITE_APP_FILES_URL}${
                      userii?.avatar
                    }`}
                    alt={"profile"}
                  />
                )}
                <h1 className="text-[25px] font-medium">{userii.userName}</h1>
                <p className="text-[#696969]">{userii.email}</p>
                <div>
                  <button
                    onClick={() => {
                      navigate(`home/searchprofile/${userii.id}`);
                    }}
                    className="px-[30px] py-[5px] rounded-[8px] bg-[#dedede] my-[14px] font-medium hover:bg-[#c5c5c5]"
                  >
                    Смотреть профиль
                  </button>
                  <div className="">
                    {userId == myId ? (
                      <div>
                        {message.map((elem) => {
                          return (
                            <div
                              className="px-[50px] text-end"
                              key={elem.messageId}
                            >
                              <Modal
                                open={open4}
                                onClose={handleClose4}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                                sx={{ marginLeft: "auto" }}
                              >
                                <Box
                                  sx={{
                                    ...style,
                                    width: "30%",
                                    borderRadius: "18px",
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <div className="text-[15px] text-center">
                                    <h1 className="text-[23px] py-[20px] font-medium px-[30px]">
                                      Отменить отправку сообщения?
                                    </h1>
                                    <p className="pb-[20px] font-normal px-[30px]">
                                      This will remove the message for everyone
                                      but people may have seen it already.
                                      Unsent messages may still be included if
                                      the conversation is reported.
                                    </p>
                                    <h1
                                      className="border-y-[3px] py-[16px] font-medium text-[red] cursor-pointer"
                                      onClick={() => {
                                        deleteMessage(deleteidx), handleClose4;
                                      }}
                                    >
                                      Отменить отправку
                                    </h1>
                                    <h1
                                      className="font-bold cursor-pointer pt-[18px]"
                                      onClick={handleClose4}
                                    >
                                      Отмена
                                    </h1>
                                  </div>
                                </Box>
                              </Modal>
                              <div
                                className="flex gap-[3px] font-bold text-[16px]  cursor-pointer  "
                                onClick={handleOpen4}
                              >
                                <p>.</p>
                                <p>.</p>
                                <p>.</p>
                              </div>
                              <span
                                className="text-[25px]  my-[10px] bg-[#3797F0] py-[3px] text-[white] px-[30px] rounded-[13px]"
                                onClick={() => {
                                  setdeleteidx(elem.messageId);
                                }}
                              >
                                {elem.messageText}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        {message.map((elem) => {
                          return (
                            <div
                              className="px-[50px] text-end flex items-center gap-[19px] cursor-pointer"
                              key={elem.messageId}
                            >
                              <Modal
                                open={open4}
                                onClose={handleClose4}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                                sx={{ marginLeft: "auto" }}
                              >
                                <Box
                                  sx={{
                                    ...style,
                                    width: "30%",
                                    borderRadius: "18px",
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <div className="text-[15px] text-center">
                                    <h1 className="text-[23px] py-[20px] font-medium px-[30px]">
                                      Отменить отправку сообщения?
                                    </h1>
                                    <p className="pb-[20px] font-normal px-[30px]">
                                      This will remove the message for everyone
                                      but people may have seen it already.
                                      Unsent messages may still be included if
                                      the conversation is reported.
                                    </p>
                                    <h1
                                      className="border-y-[3px] py-[16px] font-medium text-[red] cursor-pointer"
                                      onClick={() => {
                                        deleteMessage(deleteidx), handleClose4;
                                      }}
                                    >
                                      Отменить отправку
                                    </h1>
                                    <h1
                                      className="font-bold cursor-pointer pt-[18px]"
                                      onClick={handleClose4}
                                    >
                                      Отмена
                                    </h1>
                                  </div>
                                </Box>
                              </Modal>
                              <div
                                className="flex gap-[3px] font-bold  text-[29px] cursor-pointer text-[white] hover:text-[black]"
                                onClick={handleOpen4}
                              >
                                <p>.</p>
                                <p>.</p>
                                <p>.</p>
                              </div>
                              <span
                                className="text-[25px] font-serif my-[10px] bg-[#cbcbcb] px-[30px] rounded-[13px]"
                                onClick={() => {
                                  setdeleteidx(elem.messageId);
                                }}
                              >
                                {elem.messageText}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-[20px] items-center justify-between w-[95%] m-auto border-[2px] px-[25px] py-[10px] rounded-[20px] mt-[200px]">
                <div className="flex items-center gap-[20px] w-[90%]">
                  <IconButton>
                    <svg
                      aria-label="Выбрать смайлик"
                      class="x1lliihq x1n2onr6"
                      color="rgb(0, 0, 0)"
                      fill="rgb(0, 0, 0)"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <title>Выбрать смайлик</title>
                      <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                    </svg>
                  </IconButton>
                  <input
                    className="  text-[20px] outline-none w-[100%]"
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Напишите сообщение....."
                  />
                </div>
                {text ? (
                  <button
                    onClick={() => sendMessage()}
                    type=""
                    className="w-[15%] text-[14px] text-[#0095fe] hover:text-[#737373] font-bold"
                  >
                    Отправить
                  </button>
                ) : (
                  <div className="flex gap-[20px]">
                    <IconButton>
                      <svg
                        aria-label="Голосовой клип"
                        class="x1lliihq x1n2onr6"
                        color="rgb(0, 0, 0)"
                        fill="rgb(0, 0, 0)"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Голосовой клип</title>
                        <path
                          d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                        <line
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          x1="12"
                          x2="12"
                          y1="19.068"
                          y2="22"
                        ></line>
                        <line
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          x1="8.706"
                          x2="15.104"
                          y1="22"
                          y2="22"
                        ></line>
                        <path
                          d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </svg>
                    </IconButton>
                    <IconButton>
                      <svg
                        aria-label="Добавить фото или видео"
                        class="x1lliihq x1n2onr6"
                        color="rgb(0, 0, 0)"
                        fill="rgb(0, 0, 0)"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Добавить фото или видео</title>
                        <path
                          d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z"
                          fill-rule="evenodd"
                        ></path>
                        <path
                          d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905"
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                        <path
                          d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </svg>
                    </IconButton>
                    <IconButton>
                      <svg
                        aria-label="Нравится"
                        class="x1lliihq x1n2onr6"
                        color="rgb(0, 0, 0)"
                        fill="rgb(0, 0, 0)"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Нравится</title>
                        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                      </svg>
                    </IconButton>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              {ChatById?.map((e) => {
                // console.log(e);
                return (
                  <div className="" onClick={()=>getmessagebyid(e.id)} key={e.userId}>
                    <h1>{e.userName}</h1>
                    <img src={e.avatar} alt="" />
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="w-[100%] md:w-[70%] lg:w-[69%] justify-center mt-[250px]">
            <div className="m-auto flex justify-center pb-[10px]">
              <svg
                aria-label=""
                class="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="96"
                role="img"
                viewBox="0 0 96 96"
                width="96"
              >
                <title></title>
                <path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path>
              </svg>
            </div>
            <div className="m-auto text-center">
              <h1 className="text-[26px] font-medium py-[13px]">
                Ваши сообщения
              </h1>
              <h1 className="pb-[12px]">
                Отправляйте личные фото и сообщения другу или группе
              </h1>
              <button
                onClick={handleOpen2}
                className="bg-[#0095F6] hover:bg-[#1b7dbe] px-[30px] py-[7px] text-[19px] font-medium text-[white] rounded-[12px]"
              >
                Отправить сообщение
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Messages;
