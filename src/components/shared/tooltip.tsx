'use client';

import * as React from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipProps {
  children: React.ReactNode;
  message: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  aschild?: boolean;
}

export const ToolTip: React.FC<TooltipProps> = ({ children, message, side, aschild }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild={aschild}>{children}</TooltipTrigger>
      <TooltipContent
        className="dark:bg-[#303030] bg-[#fafafa] text-black dark:text-white font-extralight border-none ease-out text-sm ring-1 ring-gray-300 ring-opacity-35"
        side={side}>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
