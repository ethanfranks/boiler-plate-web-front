import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactElement, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountCircle } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAuth } from "../AuthProvider";
import NavContents from "./NavContents";

type Props = {
  children: ReactElement;
};

const AppContainer = ({ children }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const auth = useAuth();
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box height="100%" width="100%">
      <AppBar component="nav">
        <Toolbar
          sx={{
            padding: { sm: "10px 16px", md: "16px" },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ margin: "-8px" }}
          >
            <MenuIcon
              sx={{
                height: { sm: "30px", md: "40px" },
                width: { sm: "30px", md: "40px" },
              }}
            />
          </IconButton>
          <Typography variant="h5">{"Ethan's Test App"}</Typography>
          <IconButton
            aria-label="account-menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{ margin: "-8px" }}
          >
            <AccountCircle
              sx={{
                height: { sm: "30px", md: "40px" },
                width: { sm: "30px", md: "40px" },
              }}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                auth.logout();
                router.push("/accounts/login");
              }}
              sx={{ justifyContent: "space-around" }}
            >
              <LogoutIcon />
              <Typography>Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: "block",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            height: "100%",
            width: "240px",
          },
        }}
      >
        <NavContents />
      </Drawer>
      <Box component="main" height="100%" width="100%">
        {children}
      </Box>
    </Box>
  );
};

export default AppContainer;
