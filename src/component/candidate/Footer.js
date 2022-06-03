import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import SendIcon from '@mui/icons-material/Send';
// import NotificationIcon from '@mui/icons-material/Notification';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import './css/Footer.css';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() => ({
    root: {
      color: "green",
      "&$selected": {
        color: "red"
      }
    },
    selected: {}
  }));




export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  return (
    <Box sx={{ width: 500 }}>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'primary'}} elevation={3}>
      <BottomNavigation
        showLabels
        style={{background:'#C4C4C4'}}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
    
      >

        <BottomNavigationAction classes={classes.root} 
        style={{color: '#838383', activeColor:'#000000'}} label="Home" 
        icon={<AiIcons.AiOutlineHome  fontSize="24px"  color="#838383"/>}  component={Link} to="/home"/>
        <BottomNavigationAction label="Applied" 
        style={{color: '#838383'}} 
        icon={<RiIcons.RiSendPlaneLine fontSize="24px" color="#838383"/>} component={Link} to="/applied" />
        <BottomNavigationAction label="Alerts" 
        style={{color: '#838383'}} 
        icon={<BsIcons.BsBell fontSize="24px" color="#838383"/>} component={Link} to="/alerts"/>
        <BottomNavigationAction label="user" 
        style={{color: '#838383'}} 
        icon={<BiIcons.BiUser fontSize="24px" color="#838383" /> } component={Link} to="/user"/>


      </BottomNavigation>
      </Paper>
    </Box>
  );
}
