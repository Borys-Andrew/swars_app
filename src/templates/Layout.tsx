import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-main-bg  text-white">
      <header className="py-4">
        <h1 className="text-6xl font-bold text-yellow-400 text-center tracking-widest italic">
          STAR WARS
        </h1>
      </header>
      <main className="flex-grow px-4 h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
