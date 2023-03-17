import { Box } from '@mui/material';
import { HashLoader } from 'react-spinners';
import { loadingBox } from './Loading.module';

const Loading = () => {
  return (
    <Box
      position='fixed'
      top='0'
      left='0'
      height='100%'
      width='100%'
      bgcolor='#00000090'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <HashLoader color='#ffffff' />
    </Box>
  );
};

export default Loading;
