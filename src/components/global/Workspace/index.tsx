'use client';

import { useSession } from '@hooks';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import PDFViewer from './PDFViewer';
import Playground from './Playground';

const Workspace = () => {
  const { sessionData } = useSession();

  return sessionData?.showPdfFile ? (
    <PanelGroup className="flex w-full h-[calc(100vh-50px)]" direction="horizontal">
      <Panel defaultSize={40} className="m-0 p-0">
        <PDFViewer />
      </Panel>
      <PanelResizeHandle className="w-0.5 hover:bg-brand-purple" />
      <Panel defaultSize={60} className="m-0 p-0">
        <Playground showPdfFile={sessionData?.showPdfFile} />
      </Panel>
    </PanelGroup>
  ) : (
    <div className="flex h-[calc(100vh-50px)] m-0 p-0">
      <Playground
        className="flex flex-col w-[calc(100vw-8px)] mx-1"
        showPdfFile={sessionData?.showPdfFile}
      />
    </div>
  );
};

export default Workspace;
