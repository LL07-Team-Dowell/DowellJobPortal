import React, { useEffect, useState } from 'react';
// import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../../logo.png'
import { axiosInstance, myAxiosInstance } from '../../axios';
import { routes } from '../../request';
import { validateEmail } from '../../helpers/helpers';



const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	control:{
		padddingRight: theme.spacing(30),
	},
	avatar:{
        margin:theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
		width:161,
		height:105,
		paddingBottom:9,
		
    },
	logo:{
		width:168,
		height:113,

	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn({ setUser }) {
	const navigate =useNavigate();
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});
	const [formData, updateFormData]= useState(initialFormData);
	const [errorMessage, setErrorMessage] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [emailError, setEmailError] = useState(false);

	const handleChange =(e) =>{
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),

		});
	};

	useEffect(() => {

		if ( formData.email.length < 1 ) {
			setDisabled(true);
			setEmailError(false);
			return;
		}

		if (!validateEmail(formData.email)) {
			setEmailError(true);
			setDisabled(true);
			return;
		}

		setEmailError(false);
		
		if ( formData.password.length < 1 ) return setDisabled(true);

		setDisabled(false);

	}, [formData.email, formData.password])

	const handleSubmit = async (e) =>{
		e.preventDefault();
		setErrorMessage(null);
		setDisabled(true);

		try{

			return
			const response = await myAxiosInstance.post(routes.Login, {email: formData.email, password: formData.password});

			myAxiosInstance.defaults.headers.common = {
				Authorization: `Bearer ${response.data.access}`,
			}

			const userResponse = await myAxiosInstance.get(routes.User);

			setUser(userResponse.data);
	
			localStorage.setItem('user', JSON.stringify(userResponse.data));
			localStorage.setItem('refresh_token', response.data.refresh);

			navigate("/");

		}catch (err) {

			err.response.data[Object.keys(err.response.data)[0]].length === 1 ? 
			setErrorMessage(err.response.data[Object.keys(err.response.data)[0]][0]) :
			setErrorMessage(err.response.data[Object.keys(err.response.data)[0]]);

			setDisabled(false);

		}

		
			
	}
	

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
			<Avatar className={classes.avatar}  ><img  className={classes.logo} src={logo} /></Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					{
						errorMessage && <Grid item xs={12}>
							<p className='authentication__error__Message'>{errorMessage.charAt(0).toLocaleUpperCase() + errorMessage.slice(1)}</p>
						</Grid>
					}
					<TextField
						variant="outlined"
						margin="normal"
						inputProps={ { className: emailError && "input__Error__Item"} }
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					<FormControlLabel
						className={classes.control}
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={disabled}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
							Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/DowellJobPortal/#/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}