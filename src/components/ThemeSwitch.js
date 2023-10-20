import React from 'react';
import { Switch, VStack } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../reducers/app';

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.app.darkMode);
  return (
    <VStack>
      <p>Dark theme</p>
      <Switch
        onChange={() => {
          localStorage.setItem('darkMode', !isDarkMode);
          dispatch(toggleDarkMode());
        }}
        isChecked={isDarkMode}
        colorScheme="teal"
        size="lg"
      />
    </VStack>
  );
};

export default ThemeSwitch;
