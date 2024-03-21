import OBR, { Theme } from '@owlbear-rodeo/sdk';
import { ref } from 'vue';

export const colours = ref<Theme>({
  mode: 'DARK',
  primary: {
    main: '#bb99ff',
    light: 'rgb(200, 173, 255)',
    dark: 'rgb(130, 107, 178)',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  secondary: {
    main: '#ee99ff',
    light: 'rgb(241, 173, 255)',
    dark: 'rgb(166, 107, 178)',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  background: {
    paper: '#222639',
    default: '#1e2231',
  },
  text: {
    disabled: 'rgba(255, 255, 255, 0.5)',
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
  },
});

export const setupTheme = async () => {
  const setTheme = (theme: Theme) => {
    document.documentElement.style.setProperty('--primary', theme.primary.main);
    document.documentElement.style.setProperty('--primary-dark', theme.primary.dark);
    document.documentElement.style.setProperty('--primary-light', theme.primary.light);
    document.documentElement.style.setProperty('--primary-contrast', theme.primary.contrastText);

    document.documentElement.style.setProperty('--secondary', theme.secondary.main);
    document.documentElement.style.setProperty('--secondary-dark', theme.secondary.dark);
    document.documentElement.style.setProperty('--secondary-light', theme.secondary.dark);

    document.documentElement.style.setProperty('--background', theme.background.default);
    document.documentElement.style.setProperty('--background-paper', theme.background.paper);

    document.documentElement.style.setProperty('--text', theme.text.primary);
    document.documentElement.style.setProperty('--text-disabled', theme.text.disabled);

    colours.value = theme;
  };

  setTheme(await OBR.theme.getTheme());

  OBR.theme.onChange(setTheme);
};
