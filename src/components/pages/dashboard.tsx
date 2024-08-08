/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Loading, Topbar } from '@components';
import { useAuth } from '@hooks';

import DashTable from '../global/Dashboard/dashtable';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Topbar dashboardPage={true} compilerPage={false} />
      <DashTable />
    </div>
  );
}
