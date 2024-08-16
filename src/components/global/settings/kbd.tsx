interface KbdProps {
  shortcuts: string[];
}

export default function Kbd({ shortcuts }: KbdProps) {
  return (
    <div className="flex space-x-1">
      {shortcuts.map((short, idx) => (
        <kbd key={idx} className="p-1 border rounded text-nowrap">
          {short}
        </kbd>
      ))}
    </div>
  );
}
