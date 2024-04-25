
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from '@/ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import navigation from '@/menu-items';
import { drawerWidth } from './constant';

// assets
import { IconChevronRight } from '@tabler/icons-react';

// styles
// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' })(({ theme, open }) => ({
//   ...theme.typography.mainContent,
//   borderBottomLeftRadius: 0,
//   borderBottomRightRadius: 0,
//   transition: theme.transitions.create(
//     'margin',
//     open
//       ? {
//           easing: theme.transitions.easing.easeOut,
//           duration: theme.transitions.duration.enteringScreen
//         }
//       : {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen
//         }
//   ),
//   [theme.breakpoints.up('md')]: {
//     marginLeft: open ? 0 : -(drawerWidth - 20),
//     width: `calc(100% - ${drawerWidth}px)`
//   },
//   [theme.breakpoints.down('md')]: {
//     marginLeft: '20px',
//     width: `calc(100% - ${drawerWidth}px)`,
//     padding: '16px'
//   },
//   [theme.breakpoints.down('sm')]: {
//     marginLeft: '10px',
//     width: `calc(100% - ${drawerWidth}px)`,
//     padding: '16px',
//     marginRight: '10px'
//   }
// }));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout:React.FC  = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // Handle left drawer
  // const leftDrawerOpened = useSelector((state) => state.customization.opened);
  // const dispatch = useDispatch();
  const leftDrawerOpened = true;
  const handleLeftDrawerToggle = () => {
    // dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} window={undefined} />
      
    </Box>
  );
};

export default MainLayout;
