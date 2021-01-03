import React, { Fragment,useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TemplateWrapper from "../HOC/TemplateWrapper";
import { useHistory } from "react-router-dom";
import { signup } from "../../services/authentication.service";
// import { useDispatch, useSelector } from 'react-redux';
// import {setSignupInformation} from '../../redux/actions/business.action'
// import Axios from "axios";
const useStyles = makeStyles(theme => ({
  formControl: {
    width: "25vw",
    minWidth: "210px"
  },
  segmentMargin: {
    marginBottom: theme.spacing(2)
  }
}));
function SignupForm() {
  const classes = useStyles();
  const [loading, setLoading]=useState(false);
  const [message,setMessage]=useState(null);
  let history = useHistory();
  function navigateToLogin() {
    history.push("/login");
  }
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .min(1, "Please enter your Firstname")
      .required("Required"),
    lastName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .min(1, "Please enter your Lastname")
      .required("Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .min(4, "password cannot be less than 4 characters")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required")
  });
  return (
    <Fragment>
      <Typography component="h1" variant="h5" className={classes.segmentMargin}>
        Sign Up
      </Typography>
      {loading? <CircularProgress /> : ''}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true)
            const resp = signup(
              values.firstName,
              values.lastName,
              values.email,
              values.password
            );
            resp.then(response => {
             
              if (response?.data?.user) {
                history.push("/profile");
              }else if(response?.data?.errors){
                setMessage(response.data.errors)
              }
              setLoading(false)
            });
            setSubmitting(false);
        }}
      >
        {formik => (
          <form id="login-form" onSubmit={formik.handleSubmit}>
            <section className={classes.formControl}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="First Name"
                type="text"
                fullWidth
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div id="err">{formik.errors.firstName}</div>
              ) : (
                <br />
              )}
              <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Last Name"
                type="text"
                fullWidth
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div id="err">{formik.errors.lastName}</div>
              ) : (
                <br />
              )}

              <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="E-Mail"
                type="email"
                fullWidth
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div id="err">{formik.errors.email}</div>
              ) : (
                <br />
              )}
              <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Password"
                type="password"
                fullWidth
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div id="err">{formik.errors.password}</div>
              ) : (
                <br />
              )}
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              {/* <button type="submit">Sign Up</button> */}
              <Grid container>
              <Grid item xs>
                {message ? (
                <div id="err">{message}</div>
              ) : (
                <br />
              )}</Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={navigateToLogin}>
                    {"Have an account? Log in instead"}
                  </Link>
                </Grid>
              </Grid>
            </section>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}
export default TemplateWrapper(SignupForm);
