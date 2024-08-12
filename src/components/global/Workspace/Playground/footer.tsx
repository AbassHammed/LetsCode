import React from 'react';

import Icons from '@components/shared/icons';

type EditorFooterProps = {
  handleGenerate: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleGenerate }) => (
  <div className="flex dark:bg-[#303030] bg-[#fafafa] bottom-0 z-10 rounded-lg w-full h-[36px]">
    <div className="my-[10px] flex justify-between w-full">
      <div className="ml-1 flex flex-1 flex-nowrap items-center">
        <button
          className="flex py-1 px-2 m-0 font-medium items-center bg-transparent text-sm dark:text-white rounded-[5px] box-border dark:hover:bg-[#404040] hover:bg-[#f0f0f0]"
          onClick={handleGenerate}>
          <Icons.download className="mr-2 text-dark-green-s" />
          Export file
        </button>
      </div>
    </div>
  </div>
);
export default EditorFooter;
