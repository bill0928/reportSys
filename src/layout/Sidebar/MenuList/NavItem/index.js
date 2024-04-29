import { forwardRef, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

import { useSnapshot } from 'valtio';
import { usePathname, useRouter } from 'next/navigation'
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import app from '@/state/app/store'
// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //
import {config} from '../../../constant';
import styles from './page.module.css'

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const {actions, state} = app
  const {isOpen, opened} = useSnapshot(state)
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isShowTxt = isMobile? !opened: opened
  const pathname = usePathname()
  const Icon = item.icon;
  const isSelected = isOpen.findIndex((id) => id === item.id) > -1
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} 
    size={opened? "1.3rem":"1.5rem"}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => <a ref={ref} {...props} to={item.url} target={itemTarget} />)
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    actions.setMenuOpen(id)
    if (matchesSM) {
      actions.setMenu(false)
    }
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      actions.setMenuOpen(item.id)
    }
    // eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    // console.log('opened', opened)
    // console.log('isMobile', isMobile)
    // console.log('matchesSM', matchesSM)
  }, [opened, isMobile]);

  if(isMobile){
    return (
      <ListItemButton
        {...listItemProps}
        disabled={item.disabled}
        className={!opened && styles.item}
        sx={{
          borderRadius: `${config.borderRadius}px`,
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`
  
        }}
        selected={isOpen.findIndex((id) => id === item.id) > -1}
        onClick={() => itemHandler(item.id)}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }} >{itemIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography 
             variant={isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}
             color="inherit">
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                {item.caption}
              </Typography>
            )
          }
        />
        {item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>
    );
  }
  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      className={`${!opened ? styles.item:''} ${!opened && isSelected && styles.item_fix}`}
      sx={{
        borderRadius: `${config.borderRadius}px`,
        mb: opened?0.5:0,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: opened? level > 1 ? 1 : 1.25: 0,
        pl:  `${opened? level * 24: 10}px`,

      }}
      selected={isSelected}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon className={`${!opened && 'items-center'} ${!opened && styles.item_icon}`} sx={{ my: 'auto',
       minWidth: !item?.icon ? 18 : 36, 
       width:opened? undefined:46,
       height:opened? undefined:46,
       justifyContent: 'center',
        }}>{itemIcon}</ListItemIcon>
      {isShowTxt &&<ListItemText
        primary={
          <Typography 
           variant={isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}
           color="inherit">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />}
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

// NavItem.propTypes = {
//   item: PropTypes.object,
//   level: PropTypes.number
// };

export default NavItem;
