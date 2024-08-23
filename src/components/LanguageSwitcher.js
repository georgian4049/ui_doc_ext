import React, { useState } from 'react';
import { Box, Menu, MenuItem, IconButton, Fade } from '@mui/material';
import { useTranslation } from 'react-i18next';
import en from '../assets/images/UK.jpg';
import de from '../assets/images/ger.png';

const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { i18n } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        sx={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          padding: 0,
          boxShadow: 2,
          bgcolor: 'background.paper',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <img
          src={i18n.language.includes('de') ? de : en}
          alt='current language flag'
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={() => handleLanguageChange('de')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <img src={de} alt='German flag' style={{ width: 24, height: 24, borderRadius: '50%' }} />
          <span>Deutsch</span>
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange('en')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <img src={en} alt='UK flag' style={{ width: 24, height: 24, borderRadius: '50%' }} />
          <span>English</span>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
