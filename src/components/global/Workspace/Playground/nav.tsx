'use client';

import React, { useEffect, useState } from 'react';

import { Icons, ToolTip } from '@components';

import DropDown from './dropdown';

interface PreferenceNavProps {
  onLanguageSelect: (language: string) => void;
}

const PreferenceNav: React.FC<PreferenceNavProps> = ({ onLanguageSelect }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenToggle = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const exitHandler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

    return () => {
      document.removeEventListener('fullscreenchange', exitHandler);
      document.removeEventListener('webkitfullscreenchange', exitHandler);
      document.removeEventListener('mozfullscreenchange', exitHandler);
      document.removeEventListener('MSFullscreenChange', exitHandler);
    };
  }, []);

  return (
    <div className="flex items-center justify-between dark:bg-[#333] bg-[#fafafa] h-9 w-full rounded-t-md shadow-md">
      <div className="flex items-center text-white">
        <DropDown onLanguageSelect={onLanguageSelect} />
      </div>
      <div className="flex items-center relative justify-end mr-2">
        <ToolTip message="Full Screen" side="bottom">
          <button
            aria-label="FullSreen"
            className="rounded px-3 py-1.5 font-medium items-center whitespace-nowrap focus:outline-none inline-flex group ml-auto !p-1"
            onClick={handleFullScreenToggle}>
            {!isFullScreen ? (
              <Icons.maximize className="h-4 w-4 text-[#737373] dark:text-[#737373] group-hover:text-gray-7 dark:group-hover:text-dark-gray-7" />
            ) : (
              <Icons.minimize className="h-4 w-4 text-[#737373] dark:text-[#737373] group-hover:text-gray-7 dark:group-hover:text-dark-gray-7" />
            )}
          </button>
        </ToolTip>
      </div>
    </div>
  );
};

export default PreferenceNav;
