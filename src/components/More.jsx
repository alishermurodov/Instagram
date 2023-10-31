import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Switcher from './Switcher';
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { handleChangeSearch, handleChangeNotification } from '../reducers/instagram'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '0',
      border: "2px solid white",
      borderRadius: "4px"
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {

  const searchModal = useSelector((store) => store.data.searchModal)

  const notificationModal = useSelector((store) => store.data.notificationModal)

  const {t, i18n} = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  const active  = localStorage.getItem("i18nextLng")

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='dark:bg-black'>

      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="inherit"
        disableElevation
        sx={searchModal || notificationModal ? {width:"48px", padding: 0, borderRadius: "8px", textTransform: "none", minWidth:"48px"} : {padding: 0, borderRadius: "8px", textTransform: "none"}}

        onClick={handleClick}
      >
      <div onClick={() => dispatch(handleChangeSearch(false), handleChangeNotification(false))} className='p-[12px] w-[48px] xl:w-[220px] h-[48px] mr-[12px] xl:mr-0 transition ease-in-out delay-100 hover:bg-[#F2F2F2] dark:hover:bg-[#1A1A1A] rounded-[8px]'>
        <div className='flex items-center gap-[16px]'>
          <div className='dark:hidden'>
            <svg aria-label="Настройки" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Настройки</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="20" y2="20"></line></svg>
          </div>
          <div className='hidden dark:block'>
            <svg aria-label="Настройки" class="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Настройки</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="20" y2="20"></line></svg>
          </div>
          <span style={searchModal || notificationModal ? {display:"none"} : null} className='text-black dark:text-white text-[16px] hidden xl:block'>{t("layout.more")}</span>
        </div>
      </div>
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div className='dark:bg-black dark:rounded-[2px]'>
          <span className='text-black dark:text-white text-[16px] flex justify-center font-medium'>{t("layout.switchappearance")}</span>
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"12px"}}>
            <Switcher/>
            <span className='text-black dark:text-white text-[14px]'>{t("layout.darkmode")}</span>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <ul className='flex justify-center items-center gap-[8px] rounded-[4px] bg-[#262626] dark:border-[2px] dark:border-black'>
            <li className='text-[14px] font-medium cursor-pointer' style={{color: active == "en" ? "lime" : "lightgray"}} onClick={() => changeLanguage("en")}>EN</li>
            <li className='text-[14px] font-medium cursor-pointer' style={{color: active == "ru" ? "lime" : "lightgray"}} onClick={() => changeLanguage("ru")}>RU</li>
          </ul>
        </div>

      </StyledMenu>
    </div>
  );
}