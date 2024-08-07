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
