'use client';

import PDFViewer from './PDFViewer';
import Playground from './Playground';

const Workspace = () => (
  <div className="flex h-[calc(100vh-50px)]">
    <PDFViewer />
    <Playground />
  </div>
);

export default Workspace;
