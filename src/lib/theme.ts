import OBR, { Theme } from '@owlbear-rodeo/sdk';

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
  };

  setTheme(await OBR.theme.getTheme());

  OBR.theme.onChange(setTheme);
};
