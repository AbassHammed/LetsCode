import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

export const statuses = [
  {
    value: 'disconnected',
    label: 'Disconnected',
    icon: CrossCircledIcon,
  },
  {
    value: 'connected',
    label: 'Connected',
    icon: CheckCircledIcon,
  },
];
