import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../AuthProvider';

const NavContents = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  return (
    <nav aria-label='main navigation'>
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => {
              router.push('/dashboard');
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
};

export default NavContents;
