import { useColorMode } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import addons from '@storybook/addons';
import { EVENTS } from './constants';
import { ThemeContext, themeList } from '@cosmology-ui/react';

export const ThemeSync = ({ viewMode }: { viewMode: 'story' | 'docs' }) => {
  const { setColorMode } = useColorMode();
  const { theme, handleTheme } = useContext(ThemeContext);
  const channel = addons.getChannel();

  useEffect(() => {
    // update when selected a theme
    const themeToolCallback = (value: string) => {
      handleTheme(value);
      themeList.map(({ name, colorMode }) => {
        if (value === name) {
          setColorMode(colorMode);
        }
      });
    };

    // call the function when selecting theme
    channel.on(EVENTS.CHANGE_THEME, themeToolCallback);

    return () => {
      // remove event listener
      channel.removeListener(EVENTS.CHANGE_THEME, themeToolCallback);
    };
  }, []);

  useEffect(() => {
    // update theme provider and color mode when view mode changed
    if (viewMode === 'docs') {
      setColorMode('light');
      handleTheme('light');
    }
    if (viewMode === 'story') {
      const storeTheme = localStorage.getItem('cosmology-ui-theme');
      const current = themeList.filter(({ name }) => {
        if (storeTheme) return storeTheme === name;
        if (!storeTheme) return theme === name;
      })[0];
      setColorMode(current.colorMode);
      handleTheme(current.name);
    }
  }, [viewMode, setColorMode]);

  return null;
};
