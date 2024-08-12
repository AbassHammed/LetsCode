'use client';

import FontDrop from '../fontDrop';
import { KeyBind, TabSize } from '../select';

export default function EditorSettings() {
  return (
    <div className="gap-2 mt-14 font-medium text-sm p-2">
      <div className="flex items-center justify-between">
        <span>Font Size</span>
        <FontDrop />
      </div>
      <div className="flex items-center justify-between">
        <span>Key binding</span>
        <KeyBind />
      </div>
      <div className="flex items-center justify-between">
        <span>Tab size</span>
        <TabSize />
      </div>
    </div>
  );
}
