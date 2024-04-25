// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import {config} from '../constant';
import Logo from '@/ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  // const defaultId = useSelector((state) => state.customization.defaultId);
  // const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple 
    onClick={() => console.log('logo section')} 
    // component={<div />}
     to={config.defaultPath}>
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
