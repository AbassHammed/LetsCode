'use client';

import Kbd from './kbd';

export default function ShortCut() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-500 mt-8 mb-4"> General</h2>
      <div className="space-y-4 font-medium text-sm">
        <div className="flex justify-between items-center">
          <span>To move lines up / down</span>
          <Kbd shortcuts={['Alt', 'Up/Down']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Select the whole content of the editor</span>
          <Kbd shortcuts={['Ctrl-A (PC)', 'Cmd-A (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>
            When multiple selections are present, this deselects all but the primary selection
          </span>
          <Kbd shortcuts={['Esc']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Emacs-style line killing. Deletes the part of the line after the cursor.</span>
          <Kbd shortcuts={['Ctrl-K (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Delete the whole line under the cursor, including newline at the end</span>
          <Kbd shortcuts={['Ctrl-D (PC)', 'Cmd-D (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Delete the part of the line before the cursor</span>
          <Kbd shortcuts={['Cmd-Backspace (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>
            Delete the part of the line from the left side of the visual line the cursor is on
          </span>
          <Kbd shortcuts={['Cmd-Backspace (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>
            Delete the part of the line from the cursor to the right side of the visual line the
            cursor is on
          </span>
          <Kbd shortcuts={['Cmd-Delete (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Undo the last change</span>
          <Kbd shortcuts={['Ctrl-Z (PC)', 'Cmd-Z (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Redo the last undone change</span>
          <Kbd shortcuts={['Ctrl-Y (PC)', 'Shift-Cmd-Z (Mac)', 'Cmd-Y (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Undo the last change to the selection</span>
          <Kbd shortcuts={['Ctrl-U (PC)', 'Cmd-U (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>
            Redo the last change to the selection, or the last text change if no selection changes
            remain
          </span>
          <Kbd shortcuts={['Alt-U (PC)', 'Shift-Cmd-U (Mac)']} />
        </div>
      </div>
    </div>
  );
}
