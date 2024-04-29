
'use client'
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Theme, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from '@/ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import navigation from '@/menu-items';
import { drawerWidth } from './constant';
import app from '@/state/app/store'
// assets
import { IconChevronRight } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';
import { useSnapshot } from 'valtio';

type Props = {
  typography: {
    mainContent: {
      borderBottomLeftRadius: number;
      borderBottomRightRadius: number;
      transition: string;
      marginLeft: number;
      width: string;
      padding: string;
      marginRight: string;
    };
  }
} & Theme
// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' }) (({ theme, open }: { theme: Props; open: boolean }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  [theme.breakpoints.up('md')]: {
    // marginLeft: open ? 0 : -(drawerWidth - 20),
    marginLeft: open ? 0 : -(drawerWidth - 70),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px'
  }
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout:React.FC<PropsWithChildren>  = ({ children }) => {
  const theme = useTheme() as Props;
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const {actions, state} = app
  const {opened: leftDrawerOpened} = useSnapshot(state)
  const handleLeftDrawerToggle = () => {
    actions.setMenu(!leftDrawerOpened)
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
      <Main theme={theme} open={leftDrawerOpened}>
         <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign card={undefined} divider={undefined} icons={undefined} maxItems={undefined} titleBottom={undefined} />
      {children}
      </Main>
    </Box>
  );
};

export default MainLayout;
