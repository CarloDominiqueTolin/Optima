import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link
} from '@mui/material';
import { useSupabase } from '.././context/SupabaseContext';

const SignInScreen = () => {
  const { signIn } = useSupabase();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('Username', email);
    console.log('Password', password);

    await signIn(email,password,navigate);
  };

  return (
    <Grid container>
      {/* Left Side - Image */}
      <Grid item xs={6}>
        <Paper
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/5754242/pexels-photo-5754242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
            backgroundSize: 'cover',
            height: '100vh'
          }}
        />
      </Grid>

      {/* Right Side - Sign In Form */}
      <Grid item xs={6} component={Paper} elevation={6} square>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSignIn}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                {/* Forgot password link can be added here */}
              </Grid>
              <Grid item>
                <Link href="SignUp" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInScreen;
