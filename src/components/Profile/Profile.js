import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import {getLoggedInUser,logout} from '../../services/authentication.service'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height:'100vh'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height:'30vh'
  },
  heightClass:{
    height:'30vh',
    marginTop:'10vh',
    minHeight:'270px'
  },
  text: {
    fontFamily: 'Georgia, serif',
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [name,setName]=useState(null);
  const [email,setEmail]=useState(null);
  const [userId,setUserId]=useState(null);
  let history = useHistory();
  function logOutFromApp(){
    logout()
      history.push('/login');
  }
useEffect(() => {
    const info = getLoggedInUser();
    if (info.user) {
        setName(`${info.user.firstName} ${info.user.lastName}`);
        setEmail(info.user.email)
        setUserId(info.user.id)
    }
})
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Button color="inherit"onClick={logOutFromApp}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={2} md={3} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square className={classes.heightClass}>
          <div className={classes.paper}>
          <Typography variant="h3" className={classes.k}>
            Welcome, {name}
          </Typography>
          <Typography variant="h6" className={classes.k}>
            Your User Id is : {userId}
          </Typography>
          <Typography variant="h6" className={classes.k}>
            Your Email is: {email}
          </Typography>
          </div>
        </Grid>
        <Grid item xs={false} sm={2} md={3} className={classes.image} />
      </Grid>
    </div>
  );
}