// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://www.google.com" target="_blank" underline="hover">
      Report Sys
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://www.google.com" target="_blank" underline="hover">
      &copy; T1 xxxx.com
    </Typography>
  </Stack>
);

export default AuthFooter;
