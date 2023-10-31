import React, { useState } from "react";
import Swiper from "../../components/SwiperSh";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { axiosRequest, getToken, saveToken } from "../../utilities/axiosRequest";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Regestrition from "../Regeistretion/Regestrition";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState("")
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Login = async () => {
    console.log(1)
    const obj = {
      userName: userName,
      password: password
    }
    try {
      const { data } = await axiosRequest.post("Account/login", obj)
      saveToken(data.data)
      navigate('home')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="bg-[white] py-[30px] w-[100%]">
      <div className="bg-[white] flex justify-evenly gap-[20px] items-center ">
        <div className="flex justify-center items-center w-[33%]">
          <img src="src/assets/home-phones.png" alt="" />
          <div className="hidden xl:block w-[95%]">
            <Swiper />
          </div>
        </div>
        <div className="xs:w-[80%] sm:w-[70%] lg:w-[43%] xs:my-[30px] xl:w-[26%] xs:mr-[100px] sm:mr-[140px]">
          <div className="sm:border-[2px] xl:w-[100%] xs:px-[25px] sm:px-[50px]">
            <h1 className="text-[40px] m-auto text-center py-[20px] font-medium">
              <svg
                aria-label="Instagram"
                class="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="49"
                role="img"
                viewBox="32 4 113 32"
                width="303"
              >
                <title>Instagram</title>
                <path
                  clip-rule="evenodd"
                  d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </h1>
            <form>
              <TextField
                onChange={(e) => setUserName(e.target.value)}
                sx={{ width: "100%" }}
                id="filled-basic"
                label="Телефон, имя пользователя или эл.адрес"
                variant="filled"
              />
              <div className="">
                <FormControl
                  sx={{ m: 1, width: "100%", color: "#0f0f0f" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </form>

            <button
              onClick={() => Login()}
              className="bg-[#4CB5F9] hover:bg-[#375cff] text-[white] px-[30px] py-[8px] rounded-[12px] text-[20px] w-[100%] m-auto my-[20px]"
            >
              Войти
            </button>
            <div className="flex gap-[14px] items-center text-[#b6b6b6] justify-center">
              <h1 className="font-medium hidden 2xl:block">----------------</h1>
              <h1 className="text-[20px] font-medium">ИЛИ</h1>
              <h1 className="font-medium hidden 2xl:block">----------------</h1>
            </div>
            <div className="flex items-center justify-center gap-[20px] py-[20px]">
              <img
                className="w-[14%] "
                src="data:image/png;base64,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"
                alt=""
              />
              <h1 className="text-[blue] md:text-[20px] font-medium">
                Войти через Facebook
              </h1>
            </div>
            <h1 className="text-center pb-[20px]">Забыли пароль?</h1>
          </div>
          <div className="sm:border-[2px] my-[20px] px-[40px] py-[20px] text-center">
          <Link to={"/regestrition"}>
            <h1 className="xs:text-[10px] sm:text-[17px]">
              У вас ещё нет аккаунта?
              <span className="text-[blue]">Зарегистрироваться</span>
            </h1>
          </Link> 
          
          </div>
          <h1 className="text-center py-[20px]">Установите приложение.</h1>
          <img className="m-auto" src="src/assets/swiper1Sh.jpg" alt="" />
        </div>
      </div>
      <div className="w-[87%] text-[#858585] text-[13px] m-auto flex justify-center gap-[25px] text-center flex-wrap mt-[40px]">
        <p>Meta</p>
        <p>Информация</p>
        <p>Блог</p>
        <p>Вакансии</p>
        <p>Помощь</p>
        <p>API</p>
        <p>Конфиденциальность</p>
        <p>Условия</p>
        <p>Места</p>
        <p>Instagram Lite</p>
        <p>Threads</p>
        <p>Загрузка контактов и лица, не являющиеся пользователями</p>
        <p>Meta Verified</p>
        <p>Русский</p>
        <p> © 2023 Instagram from</p>
      </div>
    </div>
  );
};

export default Login;
