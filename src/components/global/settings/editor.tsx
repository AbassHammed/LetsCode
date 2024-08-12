'use client';

import { Switch } from '@components/shared/switch';
import { useEditorOptions } from '@hooks';

import FontDrop from '../fontDrop';
import { KeyBind, TabSize } from '../select';

export default function EditorSettings() {
  const { options, updateOption } = useEditorOptions();
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
      <div className="flex items-center justify-between">
        <span>Show line numbers</span>
        <Switch
          onCheckedChange={e => updateOption('lineNumbers', e)}
          checked={options.lineNumbers}
        />
      </div>
    </div>
  );
}
