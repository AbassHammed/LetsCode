'use client';

import { cn, generateRandomHexColor, getInitials } from '@lib/utils';

export default function InitialsContainer({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      style={{ backgroundColor: generateRandomHexColor() }}
      className={cn(
        `object-cover text-[18px] font-medium !m-0 !p-0 object-top rounded-full h-10 w-10 text-white flex justify-center items-center relative transition duration-500`,
        className,
      )}>
      {getInitials(name)}
    </span>
  );
}
