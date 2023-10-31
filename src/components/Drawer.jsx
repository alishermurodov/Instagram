import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import Switch from "@mui/material/Switch";
import { axiosRequest } from "../utilities/axiosRequest";



const label = { inputProps: { "aria-label": "Size switch demo" } };


export default function TemporaryDrawer({ chatId, getChatt, sendmodal }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // console.log(chatId);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // delete chat

  async function deleteChat(chatId) {
    try {
      let { data } = await axiosRequest.delete(
        `Chat/delete-chat?chatId=${chatId}`
      );
      getChatt();
      setState(false);
      sendmodal(false);
    } catch (error) {
      console.log(error);
    }
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="py-[30px] border-[2px]">
        <h1 className="text-[22px] font-semibold pb-[40px] px-[24px]">
          Информация
        </h1>
        <div className="px-[24px] flex justify-center gap-[30px] items-center text-[16px] font-normal">
          <h1>Выключить уведомления о сообщениях</h1>
          <div className="">
            <Switch {...label} defaultChecked />
          </div>
        </div>
      </div>
      <div
        className="px-[24px] py-[30px] h-[50vh]"
        style={{ overflow: "auto" }}
      >
        <div className="">
          <h1 className="text-[20px] font-semibold">Участники</h1>
          <div className="rounded-[50%] py-[20px] flex items-center gap-[10px] mb-[60px] ">
            <div className="rounded-3xl">
              <img
                className="rounded-[50%]"
                height="66"
                width="66"
                alt="Аватар пользователя"
                class="x5yr21d xl1xv1r xh8yej3 rounded-[50%]"
                referrerpolicy="origin-when-cross-origin"
                src="https://scontent.cdninstagram.com/v/t51.2885-19/387247467_1024024805300116_8441586804864033304_n.jpg?stp=dst-jpg_s100x100&amp;_nc_cat=108&amp;ccb=1-7&amp;_nc_sid=c4dd86&amp;_nc_ohc=kIQ1hws3QLQAX_NypGM&amp;_nc_ad=z-m&amp;_nc_cid=1732&amp;_nc_ht=scontent.cdninstagram.com&amp;oh=00_AfDT-mDUKAzlNPT8EYO7Lt_5eUiRFlIVDZAowAUKPxPXRQ&amp;oe=65381C7D"
              ></img>
            </div>
            <div className="">
              <h1 className="text-[17px] font-bold">mirzozoda_.i8</h1>
              <h1>Mirzozoda Mirzoali</h1>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-[16px] font-medium text-[red] px-[40px] py-[40px]">
        <h1>Пожаловаться</h1>
        <h1 className="py-[19px]">Заблокировать</h1>
        <button onClick={() => deleteChat(chatId)}>Удалить чат</button>
      </div>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            {
              <IconButton>
                <svg
                  aria-label="Информация о переписке"
                  class="x1lliihq x1n2onr6"
                  color="rgb(0, 0, 0)"
                  fill="rgb(0, 0, 0)"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Информация о переписке</title>
                  <circle
                    cx="12.001"
                    cy="12.005"
                    fill="none"
                    r="10.5"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></circle>
                  <circle cx="11.819" cy="7.709" r="1.25"></circle>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="10.569"
                    x2="13.432"
                    y1="16.777"
                    y2="16.777"
                  ></line>
                  <polyline
                    fill="none"
                    points="10.569 11.05 12 11.05 12 16.777"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></polyline>
                </svg>
              </IconButton>
            }
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
