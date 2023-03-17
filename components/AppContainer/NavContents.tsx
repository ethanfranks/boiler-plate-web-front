import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const NavContents = () => {
  return (
    <nav aria-label="main navigation">
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Item 1" />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
};

export default NavContents;
