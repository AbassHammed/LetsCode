'use client';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import PDFViewer from './PDFViewer';
import Playground from './Playground';

const Workspace = () => (
  <PanelGroup className="flex w-full h-[calc(100vh-52px)]" direction="horizontal">
    <Panel defaultSize={40} className="m-0 p-0">
      <PDFViewer />
    </Panel>
    <PanelResizeHandle className="w-0.5 hover:bg-brand-purple" />
    <Panel defaultSize={60} className="m-0 p-0">
      <Playground />
    </Panel>
  </PanelGroup>
);

export default Workspace;
