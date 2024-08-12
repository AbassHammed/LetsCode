import Icons from '@icons';
import { SettingsNav } from '@types';

export const Themes = [
  { name: 'System Default', value: 'system' },
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
];

export const SettingsNavItems: {
  type: SettingsNav;
  label: string;
  icon: typeof Icons.alarm;
}[] = [
  {
    type: 'editor',
    label: 'Code Editor',
    icon: Icons.editor,
  },
  {
    type: 'shortcuts',
    label: 'Shortcuts',
    icon: Icons.keyboard,
  },
  {
    type: 'advanced',
    label: 'Premium',
    icon: Icons.brush,
  },
];

export const fonts = [
  { id: '1', name: '12px' },
  { id: '2', name: '13px' },
  { id: '3', name: '14px' },
  { id: '4', name: '15px' },
  { id: '5', name: '16px' },
  { id: '6', name: '17px' },
  { id: '7', name: '18px' },
  { id: '8', name: '19px' },
  { id: '9', name: '20px' },
  { id: '10', name: '21px' },
  { id: '11', name: '22px' },
] as const;
