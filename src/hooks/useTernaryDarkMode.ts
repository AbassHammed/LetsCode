import { useLocalStorage, useMediaQuery } from '@hooks';
import { TernaryDarkMode, TernaryDarkModeOptions, TernaryDarkModeReturn } from '@types';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
const LOCAL_STORAGE_KEY = 'dark-mode';

export function useTernaryDarkMode({
  defaultValue = 'system',
  localStorageKey = LOCAL_STORAGE_KEY,
  initializeWithValue = true,
}: TernaryDarkModeOptions = {}): TernaryDarkModeReturn {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY, { initializeWithValue });
  const [mode, setMode] = useLocalStorage(localStorageKey, defaultValue, {
    initializeWithValue,
  });

  const isDarkMode = mode === 'dark' || (mode === 'system' && isDarkOS);

  const toggleTernaryDarkMode = () => {
    const modes: TernaryDarkMode[] = ['light', 'system', 'dark'];
    setMode((prevMode): TernaryDarkMode => {
      const nextIndex = (modes.indexOf(prevMode) + 1) % modes.length;
      return modes[nextIndex];
    });
  };

  return {
    isDarkMode,
    ternaryDarkMode: mode,
    setTernaryDarkMode: setMode,
    toggleTernaryDarkMode,
  };
}
