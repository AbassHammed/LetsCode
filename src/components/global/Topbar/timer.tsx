'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Icons, ToolTip } from '@components';

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId.current);
  }, [isRunning]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex items-center justify-center h-8 dark:text-[#fff9]">
      {isRunning || time !== 0 ? (
        <div className="flex items-center h-8">
          <div
            className="flex rounded-l-md dark:bg-[#222] bg-[#e7e7e7] p-1.5 h-8 justify-center items-center cursor-pointer"
            onClick={() => {
              setIsRunning(false);
              setTime(0);
            }}>
            <Icons.chevronLeft />
          </div>
          <div className="dark:bg-[#222] bg-[#e7e7e7] flex items-center space-x-2 h-8 justify-center p-1.5 mx-[1px]">
            {isRunning ? (
              <ToolTip message="Pause">
                <Icons.pause onClick={() => setIsRunning(false)} className="cursor-pointer" />
              </ToolTip>
            ) : (
              <ToolTip message="Play">
                <Icons.play onClick={() => setIsRunning(true)} className="cursor-pointer" />
              </ToolTip>
            )}
            <span>{formatTime(time)}</span>
          </div>
          <ToolTip message="Reset">
            <div
              className="rounded-r-md dark:bg-dark-fill-3 bg-[#e7e7e7] p-1.5 cursor-pointer h-8 flex justify-center items-center"
              onClick={() => {
                setTime(0);
                setIsRunning(true);
              }}>
              <Icons.sync />
            </div>
          </ToolTip>
        </div>
      ) : (
        <ToolTip message="Start Timer">
          <div
            className="flex items-center rounded cursor-pointer p-2 ease-in-out transition duration-300 bg-[#e7e7e7] dark:bg-dark-fill-3 h-8 justify-center"
            onClick={() => setIsRunning(true)}>
            <Icons.alarm className="h-[18px] w-[18px] dark:text-[#fff9] text-[#585c65]" />
          </div>
        </ToolTip>
      )}
    </div>
  );
};

export default Timer;
