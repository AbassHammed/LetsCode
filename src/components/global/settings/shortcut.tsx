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
      </div>
    </div>
  );
}
