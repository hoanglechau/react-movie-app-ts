import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import TheatersIcon from "@mui/icons-material/Theaters";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MSearchBar from "../components/MSearchBar";
import { useAuth } from "../contexts/AuthContext";

function MainHeader() {
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Menu for desktop devices
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Menu for mobile devices
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    handleMobileMenuClose();
    auth.signout();
    // Redirect to home page after logging out
    navigate("/");
  };

  // Menu for desktop devices
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {auth.user ? (
        <Box>
          <MenuItem component={Link} to="favorite" onClick={handleMenuClose}>
            <IconButton
              color="inherit"
              disableRipple={true}
              children={<InsertEmoticonIcon />}
            />
            <p>{auth.user}</p>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <IconButton
              color="inherit"
              disableRipple={true}
              children={<LogoutIcon />}
            />
            <p>Log out</p>
          </MenuItem>
        </Box>
      ) : (
        <MenuItem
          component={Link}
          to="login"
          state={{ backgroundLocation: location, from: location }}
          onClick={handleMenuClose}
        >
          <IconButton
            color="inherit"
            disableRipple={true}
            children={<LoginIcon />}
          />
          <p>Log in</p>
        </MenuItem>
      )}
    </Menu>
  );

  // Menu for mobile devices
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        component={Link}
        to="movie/popular/1"
        onClick={handleMobileMenuClose}
      >
        <IconButton
          size="large"
          color="inherit"
          disableRipple={true}
          children={<TheatersIcon />}
        />
        <p>Movies</p>
      </MenuItem>

      <MenuItem
        component={Link}
        to="tv/popular/1"
        onClick={handleMobileMenuClose}
      >
        <IconButton
          size="large"
          color="inherit"
          disableRipple={true}
          children={<LiveTvIcon />}
        />

        <p>TV Shows</p>
      </MenuItem>
      <MenuItem
        component={Link}
        to="person/popular/1"
        onClick={handleMobileMenuClose}
      >
        <IconButton
          size="large"
          color="inherit"
          disableRipple={true}
          children={<RecentActorsIcon />}
        />

        <p>People</p>
      </MenuItem>
      {auth.user ? (
        <Box>
          <MenuItem
            component={Link}
            to="favorite"
            onClick={handleMobileMenuClose}
          >
            <IconButton
              size="large"
              aria-label="favorite"
              aria-controls={mobileMenuId}
              disableRipple={true}
              color="inherit"
              children={<FavoriteBorderIcon />}
            />
            <p>Favorites</p>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <IconButton
              size="large"
              aria-label="log out"
              aria-controls={mobileMenuId}
              disableRipple={true}
              color="inherit"
              children={<LogoutIcon />}
            />
            <p>Log out</p>
          </MenuItem>
        </Box>
      ) : (
        <MenuItem component={Link} to="login" onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="login"
            aria-controls={mobileMenuId}
            disableRipple={true}
            aria-haspopup="true"
            color="inherit"
            children={<LoginIcon />}
          />
          <p>Log in</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ p: { xs: 1, md: 0 } }}>
          <Box sx={{ flexGrow: { xs: 1, sm: 0.2, md: 0.1 } }} />
          <Typography
            component={Link}
            to="/"
            color="inherit"
            ml={{ xs: 2, sm: 0 }}
            sx={{
              textDecoration: "none",
              p: 0,
              typography: { sm: "h6", md: "h5", lg: "h3" }
            }}
          >
            HMDB
          </Typography>
          <Box sx={{ flexGrow: { xs: 1, sm: 0.1 } }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" }
            }}
          >
            <Button
              component={Link}
              to="/movie/popular/1"
              variant="text"
              size="medium"
              color="inherit"
              sx={{ textDecoration: "none", p: 0, mr: 3 }}
            >
              Movies
            </Button>
            <Button
              component={Link}
              to="/tv/popular/1"
              variant="text"
              size="medium"
              color="inherit"
              sx={{ textDecoration: "none", p: 0, mr: 3 }}
            >
              TV Shows
            </Button>
            <Button
              component={Link}
              to="/person/popular/1"
              variant="text"
              size="medium"
              color="inherit"
              sx={{ textDecoration: "none", p: 0 }}
            >
              People
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <MSearchBar />
          <Box
            sx={{
              display: { xs: "none", md: "flex" }
            }}
          >
            <IconButton
              component={Link}
              to="/favorite"
              size="large"
              color="inherit"
              children={<FavoriteBorderIcon />}
            />

            <IconButton
              size="large"
              aria-label="user account"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              children={<AccountBoxIcon />}
            />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0.1, display: { xs: "none", md: "flex" } }} />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default MainHeader;
