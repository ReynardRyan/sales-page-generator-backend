import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
