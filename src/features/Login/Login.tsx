import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {useFormik} from 'formik';
import {loginTC} from './authReducer';

export const Login = () => {

	const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		onSubmit: values => {
			//alert(JSON.stringify(values))
			dispatch(loginTC(JSON.stringify(values)))
			console.log(loginTC(JSON.stringify(values)))
		},
	})

	if (isLoggedIn) {
		return <Redirect to={'/'}/>
	}


	return (
			<Grid container justify="center">
				<Grid item xs={4}>
					<form onSubmit={formik.handleSubmit}>
						<FormControl>
							<FormLabel>
								<p>
									To log in get registered <a href={'https://social-network.samuraijs.com/'}
																							target={'_blank'}>here</a>
								</p>
								<p>
									or use common test account credentials:
								</p>
								<p> Email: free@samuraijs.com
								</p>
								<p>
									Password: free
								</p>
							</FormLabel>
							<FormGroup>
								<TextField
										label="Email"
										margin="normal"
										{...formik.getFieldProps('email')}
								/>
								{formik.errors.email ? <div>{formik.errors.email}</div> : null}
								<TextField
										type="password"
										label="Password"
										margin="normal"
										{...formik.getFieldProps('password')}
								/>
								{formik.errors.password ? <div>{formik.errors.password}</div> : null}
								<FormControlLabel
										label={'Remember me'}
										control={<Checkbox
												{...formik.getFieldProps('rememberMe')}
												checked={formik.values.rememberMe}
										/>}
								/>
								<Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
							</FormGroup>
						</FormControl>
					</form>
				</Grid>
			</Grid>
	)
}
