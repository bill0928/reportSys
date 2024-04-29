// import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
// import Link from 'next/link'
// material-ui
import { ButtonBase, Link } from '@mui/material';

// project imports
import {config} from '../constant';
import Logo from '@/ui-component/Logo';
import app from '@/state/app/store'
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const {actions, state} = app
  const {defaultId} = useSnapshot(state)
  return (
    <ButtonBase disableRipple 
      onClick={() => actions.setMenuOpen(defaultId)} 
      component={Link}
      to={config.defaultPath}>
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
