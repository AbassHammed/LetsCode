interface KbdProps {
  shortcuts: string[];
}

export default function Kbd({ shortcuts }: KbdProps) {
  return (
    <div className="flex space-x-1">
      {shortcuts.map((short, idx) => (
        <kbd key={idx} className="px-2 py-1 border rounded">
          {short}
        </kbd>
      ))}
    </div>
  );
}
