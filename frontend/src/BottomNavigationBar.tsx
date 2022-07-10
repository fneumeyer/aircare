import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

export function BottomNavigationBar(){
  const [value, setValue] = useState<number | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    switch(value){
      case 0:
        navigate('/');
      break;
    }
  }, [navigate, value])

  return <Paper elevation={3}>
  <BottomNavigation
    showLabels
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
  >
    <BottomNavigationAction label="Home" icon={<HomeIcon />} />
    <BottomNavigationAction label="Search" icon={<SearchIcon />} />
    <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
  </BottomNavigation>
</Paper>
}