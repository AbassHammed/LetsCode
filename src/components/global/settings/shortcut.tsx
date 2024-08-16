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
          <span>Emacs-style line killing. Deletes the part of the line after the cursor.</span>
          <Kbd shortcuts={['Ctrl-K (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Delete the part of the line before the cursor</span>
          <Kbd shortcuts={['Cmd-Backspace (Mac)']} />
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
          <span>Redo the last change to the selection</span>
          <Kbd shortcuts={['Alt-U (PC)', 'Shift-Cmd-U (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor to the start of the document</span>
          <Kbd shortcuts={['Ctrl-Home (PC)', 'Cmd-Up (Mac)', 'Cmd-Home (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor to the end of the document</span>
          <Kbd shortcuts={['Ctrl-End (PC)', 'Cmd-End (Mac)', 'Cmd-Down (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor to the start of the line</span>
          <Kbd shortcuts={['Alt-Left (PC)', 'Ctrl-A (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>
            Move to the start of the text on the line, or if already there, to the actual start of
            the line
          </span>
          <Kbd shortcuts={['SmartHome']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor to the end of the line</span>
          <Kbd shortcuts={['Alt-Right (PC)', 'Ctrl-E (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor to the right side of the visual line it is on</span>
          <Kbd shortcuts={['Cmd-Right (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor to the left side of the visual line it is on</span>
          <Kbd shortcuts={['Cmd-Left (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>
            Move to the left side of the visual line it is on, behaving like goLineStartSmart if at
            the start
          </span>
          <Kbd shortcuts={['Smart']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor up one line</span>
          <Kbd shortcuts={['Up', 'Ctrl-P (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move down one line</span>
          <Kbd shortcuts={['Down', 'Ctrl-N (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor up one screen and scroll up by the same distance</span>
          <Kbd shortcuts={['PageUp', 'Shift-Ctrl-V (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor down one screen and scroll down by the same distance</span>
          <Kbd shortcuts={['PageDown', 'Ctrl-V (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>
            Move the cursor one character left, going to the previous line when hitting the start of
            line
          </span>
          <Kbd shortcuts={['Left', 'Ctrl-B (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>
            Move the cursor one character right, going to the next line when hitting the end of line
          </span>
          <Kbd shortcuts={['Right', 'Ctrl-F (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor one character left, but do&apos;t cross line boundaries</span>
          <Kbd shortcuts={['ColumnLeft']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor one character right, don&apos;t cross line boundaries</span>
          <Kbd shortcuts={['ColumnRight']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor to the start of the previous word</span>
          <Kbd shortcuts={['Alt-B (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move the cursor to the end of the next word</span>
          <Kbd shortcuts={['Alt-F (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move to the left of the group before the cursor</span>
          <Kbd shortcuts={['Ctrl-Left (PC)', 'Alt-Left (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Move to the right of the group after the cursor</span>
          <Kbd shortcuts={['Ctrl-Right (PC)', 'Alt-Right (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Delete the character before the cursor</span>
          <Kbd shortcuts={['Shift-Backspace', 'Ctrl-H (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Delete the character after the cursor</span>
          <Kbd shortcuts={['Delete', 'Ctrl-D (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Delete up to the start of the word before the cursor</span>
          <Kbd shortcuts={['Alt-Backspace (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Delete up to the end of the word after the cursor</span>
          <Kbd shortcuts={['Alt-D (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Delete to the left of the group before the cursor</span>
          <Kbd shortcuts={['Ctrl-Backspace (PC)', 'Alt-Backspace (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Delete to the start of the group after the cursor</span>
          <Kbd shortcuts={['Ctrl-Delete (PC)', 'Ctrl-Alt-Backspace (Mac)', 'Alt-Delete (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Auto-indent the current line or selection</span>
          <Kbd shortcuts={['Shift-Tab']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Indent the current line or selection by one indent unit</span>
          <Kbd shortcuts={['Ctrl-] (PC)', 'Cmd-] (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Dedent the current line or selection by one indent unit</span>
          <Kbd shortcuts={['Ctrl-[ (PC)', 'Cmd-[ (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Insert a tab character at the cursor</span>
          <Kbd shortcuts={['Tab']} />
        </div>

        <div className="flex justify-between items-center">
          <span>
            Insert the amount of spaces that match the width a tab at the cursor position would have
          </span>
          <Kbd shortcuts={['SoftTab']} />
        </div>

        <div className="flex justify-between items-center">
          <span>
            If something is selected, indent it by one indent unit; if nothing is selected, insert a
            tab character
          </span>
          <Kbd shortcuts={['defaultTab']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Swap the characters before and after the cursor</span>
          <Kbd shortcuts={['Ctrl-T (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Insert a newline and auto-indent the new line</span>
          <Kbd shortcuts={['Enter']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Flip the overwrite flag</span>
          <Kbd shortcuts={['Insert']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Save</span>
          <Kbd shortcuts={['Ctrl-S (PC)', 'Cmd-S (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Find</span>
          <Kbd shortcuts={['Ctrl-F (PC)', 'Cmd-F (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Find next</span>
          <Kbd shortcuts={['Ctrl-G (PC)', 'Cmd-G (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Find previous</span>
          <Kbd shortcuts={['Shift-Ctrl-G (PC)', 'Shift-Cmd-G (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Replace</span>
          <Kbd shortcuts={['Shift-Ctrl-F (PC)', 'Cmd-Alt-F (Mac)']} />
        </div>

        <div className="flex justify-between items-center">
          <span>Replace all</span>
          <Kbd shortcuts={['Shift-Ctrl-R (PC)', 'Shift-Cmd-Alt-F (Mac)']} />
        </div>
      </div>
    </div>
  );
}
