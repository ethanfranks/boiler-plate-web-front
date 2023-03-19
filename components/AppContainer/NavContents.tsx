import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';
import DashboardIcon from '@mui/icons-material/Dashboard';

const navContentsArr = [
  {
    icon: <DashboardIcon />,
    text: 'Dashboard',
  },
];

const NavContents = () => {
  const router = useRouter();

  return (
    <nav aria-label='main navigation'>
      <List>
        {navContentsArr.map((item) => (
          <ListItem key={item.text}>
            <ListItemButton
              onClick={() => {
                router.push(`/${item.text.toLowerCase()}`);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

export default NavContents;
