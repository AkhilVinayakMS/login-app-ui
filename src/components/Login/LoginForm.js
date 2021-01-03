import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import TemplateWrapper from "../HOC/TemplateWrapper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { login } from "../../services/authentication.service";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  formControl: {
    width: "25vw",
    minWidth: "210px"
  },
  segmentMargin: {
    marginBottom: theme.spacing(2)
  }
}));
function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const classes = useStyles();
  let history = useHistory();
  function navigateToSignup() {
    history.push("/signup");
  }
  const initialValues = {
    email: "",
    password: ""
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .min(4, "Password cannot be less than 4 characters")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required")
  });
  return (
    <Fragment>
      <Typography component="h1" variant="h5" className={classes.segmentMargin}>
        Log In
      </Typography>
      {loading? <CircularProgress /> : ''}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          setLoading(true)
          const resp = login(values.email, values.password);
          resp.then(response => {
            if (response?.data?.user) {
              history.push("/profile");
            } else if (response.message) {
              setMessage(response.message);
            }
            setLoading(false)
          });
        }}
      >
        {formik => (
          <form id="login-form" onSubmit={formik.handleSubmit}>
            <section className={classes.formControl}>
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
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  {message ? <div id="err">{message}</div> : <br />}
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={navigateToSignup}>
                    {"Don't have an account? Sign Up"}
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
export default TemplateWrapper(LoginForm);
