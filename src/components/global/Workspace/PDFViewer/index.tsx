'use client';

import { useCallback, useState } from 'react';

import { useSession } from '@hooks';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import Icons from '@components/shared/icons';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface NavProps {
  pageNumber: number;
  numPages: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}

const Nav: React.FC<NavProps> = ({ pageNumber, numPages, goToPrevPage, goToNextPage }) => (
  <div className="flex h-9 w-full items-center justify-center dark:bg-[#333] bg-[#fafafa] text-gray-400 overflow-x-hidden rounded-t-md">
    <div className="flex items-center space-x-4 ">
      <button
        onClick={goToPrevPage}
        disabled={pageNumber <= 1}
        className="flex items-center justify-center rounded-sm dark:hover:bg-dark-fill-2 hover:bg-[#e7e7e7] h-7 w-7 cursor-pointer">
        <Icons.chevronLeft />
      </button>
      <div className="dark:bg-[#0f0f0f] bg-[#f0f0f0] dark:text-white text-black rounded-md px-2 py-1 text-sm font-medium">
        <span>{pageNumber}</span>
        <span className="text-gray-400"> / {numPages}</span>
      </div>
      <button
        onClick={goToNextPage}
        disabled={pageNumber >= numPages}
        className="flex items-center justify-center rounded-sm dark:hover:bg-dark-fill-2 hover:bg-[#e7e7e7] h-7 w-7 cursor-pointer">
        <Icons.chevronRight />
      </button>
    </div>
  </div>
);

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const { sessionData } = useSession();

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  const goToPrevPage = useCallback(() => setPageNumber(prev => Math.max(prev - 1, 1)), []);
  const goToNextPage = useCallback(
    () => setPageNumber(prev => Math.min(prev + 1, numPages)),
    [numPages],
  );

  return (
    <div
      tabIndex={-1}
      className="dark:bg-[#282828] bg-white rounded-lg overflow-hidden ml-2 mr-1 my-1  focus:ring-1 focus:ring-[#969696] focus:ring-opacity-50
                       active:ring-1 active:ring-[#969696] active:ring-opacity-50">
      <Nav
        pageNumber={pageNumber}
        numPages={numPages}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
      />
      <div className="flex px-0 py-2 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-2">
          <Document
            file={sessionData?.filePath}
            onLoadSuccess={onDocumentLoadSuccess}
            className="w-full"
            renderMode="canvas">
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
