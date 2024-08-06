import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  const PColor = localStorage.getItem('p-color');
  if (PColor) {
    return PColor;
  } else {
    localStorage.setItem('p-color', color);
    return color;
  }
}

export function getInitials(name: string) {
  const nameParts = name.split(' ');
  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase();
  } else {
    return nameParts
      .slice(0, 2)
      .map(part => part[0].toUpperCase())
      .join('');
  }
}
