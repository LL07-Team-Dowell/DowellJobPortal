import React, {useEffect, useState} from 'react';
import { authAxiosInstance, myAxiosInstance } from '../../axios';
import {useNavigate} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline  from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { routes } from '../../request';
import logo from '../../logo.png';
import { validateEmail } from '../../helpers/helpers';
import { Select } from '@mui/material';
import { MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    paper:{
        marginTop:theme.spacing(8),
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
		
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
	
    form:{
        width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
    },
    submit:{
        margin:theme.spacing(3, 0, 2),
    },
}));

function SignUP({ setUser }){
	let navigate = useNavigate();
	const initialFormData = Object.freeze({
		email:'',
		username:'',
		password:'',
		phone: '',
		first_name: '',
		last_name: '',
		role: 'TeamMember',
		teamcode: '100055',
		phonecode: '',
		profile_image: '',
	});
	const [formData, updateFormData]= useState(initialFormData);
	const [errorMessage, setErrorMessage] = useState(null);
	const [emailError, setEmailError] = useState(false);
	const [usernameError, setUsernameError] = useState(false);
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [phoneNumError, setPhoneNumError] = useState(false);
	const [disabled, setDisabled] = useState(true);

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

		if ( formData.username.length < 1 ) {
			setUsernameError(true);
			setDisabled(true);
			return
		}

		if (formData.first_name.length > 0) setFirstNameError(false);

		if (formData.last_name.length > 0) setLastNameError(false);
		
		setUsernameError(false);
		setDisabled(false);

	}, [formData]);

	const handleChange=(e)=>{
		if (e.target.name === "profile_image"){
			updateFormData({
				...formData, 
				[e.target.name]: e.target.files[0],
			});
			return
		}

		updateFormData({
			...formData,
			[e.target.name]:e.target.value.trim(),

		});
	};
	const handleSubmit= async (e)=>{
		e.preventDefault();

		if (formData.first_name.length < 1) return setFirstNameError(true);

		if (formData.last_name.length < 1) return setLastNameError(true);

		setDisabled(true);
		setErrorMessage(null);

		try{
			console.log(formData)
			// const response = await authAxiosInstance.post(routes.User, formData);
			return
			authAxiosInstance.defaults.headers = {
				Authorization: `Bearer ${response.data.access}`,
			}

			const userResponse = await authAxiosInstance.get(routes.User);

			setUser(userResponse.data);

			localStorage.setItem('user', JSON.stringify(userResponse.data));
			localStorage.setItem('refresh_token', response.data.refresh);

			navigate("/");

		}catch (err){
			setErrorMessage(err.response.data[Object.keys(err.response.data)[0]][0])
			setDisabled(false)
		}

	};
	const classes = useStyles();



	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}  ><img  className={classes.logo} src={logo} /></Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate encType='multipart/form-data'>
					<Grid container spacing={2}>
						{
							errorMessage && <Grid item xs={12}>
								<p className='authentication__error__Message'>{errorMessage.charAt(0).toLocaleUpperCase() + errorMessage.slice(1)}</p>
							</Grid>
						}
						<Grid item xs={12}>
							<TextField
								inputProps={ { className: false && "input__Error__Item"} }
								variant="outlined"
								required
								fullWidth
								id="profile_image"
								label="Profile Image"
								name="profile_image"
								type="file"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								inputProps={ { className: emailError && "input__Error__Item"} }
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								inputProps={ { className: usernameError && "input__Error__Item"} }
								label="Username"
								name="username"
								autoComplete="username"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								inputProps={ { className: firstNameError && "input__Error__Item"} }
								id="first_name"
								label="First Name"
								name="first_name"
								autoComplete="first_name"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								inputProps={ { className: lastNameError && "input__Error__Item"} }
								id="last_name"
								label="Last Name"
								name="last_name"
								autoComplete="last_name"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								inputProps={ { className: phoneNumError && "input__Error__Item"} }
								name="phone"
								label="Phone Number"
								type="number"
								id="phone_num"
								autoComplete="tel"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Select
								variant="outlined"
								required
								fullWidth
								name="phonecode"
								labelId="phonecode"
								label="Phone Code"
								id="phone_code"
								value={formData.phonecode}
								autoComplete="phonecode"
								onChange={handleChange}
							>
								<MenuItem value={''}>Choose One</MenuItem>
								<MenuItem value={'234'} >234</MenuItem>
								<MenuItem value={'234'} >234</MenuItem>
								<MenuItem value={'234'} >234</MenuItem>
							</Select>
						</Grid>
						
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
						disabled={disabled}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/DowellJobPortal/#/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);


}
export default SignUP;