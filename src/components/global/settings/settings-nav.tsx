import { SettingsNavItems } from '@config/constants';
import { SettingsNav } from '@types';
import { cn } from '@utils';

interface SettingsNavProps {
  setVariant: React.Dispatch<React.SetStateAction<SettingsNav>>;
  variant: SettingsNav;
}

export default function SettingNav({ setVariant, variant }: SettingsNavProps) {
  return (
    <div className="bg-[#0000000a] p-4 dark:bg-[#262626] rounded-l-lg">
      <h2 className="mb-4 text-lg font-medium">Settings</h2>
      <div className="flex flex-col gap-2">
        {SettingsNavItems.map(item => (
          <button
            onClick={() => setVariant(item.type)}
            key={item.type}
            className={cn(
              variant === item.type ? 'bg-neutral-800' : 'hover:bg-neutral-800',
              'relative inline-flex items-center text-sm font-normal h-9 rounded justify-start px-3 py-[10px]',
            )}>
            <item.icon className={cn('mr-2 h-4 w-4')} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
