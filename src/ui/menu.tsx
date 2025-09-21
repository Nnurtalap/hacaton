import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import Userfront from '@userfront/toolkit';
import { LoginForm, PasswordResetForm, SignupForm } from '@userfront/react';
export default function ButtonAppBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(false);
  const tenantId = import.meta.env.VITE_USERFRONT_TENANT_ID;

  const toggleDrawer = (newOpen: boolean) => () => setIsOpen(newOpen);
  const authDrawer = (newOpen: boolean) => () => setAuth(newOpen);
  const [authForm, setAuthForm] = React.useState<'login' | 'dashboard' | 'signup' | 'reset'>(
    'login',
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    const checkLogin = async () => {
      try {
        await Userfront.init(tenantId);
        setIsLoggedIn(!!Userfront.user.userId);
        console.log('User:', Userfront.user);
      } catch (error) {
        console.error('Ошибка инициализации Userfront:', error);
      }
    };

    checkLogin();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            InDrive
          </Typography>
          <button
            onClick={() => {
              setAuth(true);
            }}
            className="cursor-pointer"
          >
            Account
          </button>
          <Drawer anchor="right" open={auth} onClose={authDrawer(false)}>
            <div className="w-[300px] p-4 text-center">
              {!isLoggedIn && (
                <Button
                  onClick={() => {
                    setAuth(true);
                    setAuthForm('login');
                  }}
                >
                  Login
                </Button>
              )}

              {!isLoggedIn && (
                <Button
                  onClick={() => {
                    setAuth(true);
                    setAuthForm('signup');
                  }}
                >
                  Sign up
                </Button>
              )}

              <Button
                onClick={() => {
                  setAuth(true);
                  setAuthForm('reset');
                }}
              >
                Reset Password
              </Button>

              {isLoggedIn && (
                <button
                  className="w-[300px] p-4 text-center text-red-600"
                  onClick={async () => {
                    await Userfront.logout();
                    localStorage.clear();
                    document.cookie =
                      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    document.cookie =
                      'idRefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    window.location.href = '/';
                  }}
                >
                  Logout
                </button>
              )}

              {authForm === 'login' && <LoginForm />}
              {authForm === 'signup' && <SignupForm />}
              {authForm === 'reset' && <PasswordResetForm />}
            </div>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
