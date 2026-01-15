
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navItems = [
    { name: 'Workspace', path: '/', icon: 'dashboard' },
    { name: 'Collections', path: '/collections', icon: 'folder_open' },
    { name: 'Team', path: '/collaborators', icon: 'groups' },
    { name: 'History', path: '/history', icon: 'history' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-workspace-bg font-display">
      {/* Sidebar */}
      <aside 
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-border-light flex flex-col transition-all duration-300 transform lg:relative lg:translate-x-0 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} transition-all`}>
          <div className="size-8 rounded-lg bg-text-main flex items-center justify-center text-white shadow-sm shrink-0">
            <span className="material-symbols-outlined text-lg">terminal</span>
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="text-sm font-extrabold leading-none text-text-main uppercase tracking-tighter">Nexus KM</h1>
              <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1 font-bold">Workspace</p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-x-hidden">
          <div className={`px-3 mb-2 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 h-0 pointer-events-none' : 'opacity-100'}`}>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">Main Menu</span>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                isActive(item.path)
                  ? 'bg-slate-50 text-text-main border border-border-light shadow-sm'
                  : 'text-text-muted hover:bg-slate-50 hover:text-text-main'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <span className={`material-symbols-outlined shrink-0 text-[22px] ${isActive(item.path) ? 'text-primary' : 'group-hover:text-primary'}`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className={`text-sm whitespace-nowrap overflow-hidden transition-all ${isActive(item.path) ? 'font-bold' : 'font-medium'}`}>
                  {item.name}
                </span>
              )}
            </Link>
          ))}
          <div className={`h-px bg-border-light my-4 mx-2 ${isCollapsed ? 'mx-0' : ''}`}></div>
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-slate-50 hover:text-text-main transition-colors group ${isCollapsed ? 'justify-center' : ''}`}>
            <span className="material-symbols-outlined shrink-0 text-[22px] group-hover:text-primary">settings</span>
            {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap overflow-hidden">Settings</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-border-light mt-auto">
          <div className={`flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="size-10 rounded-full border border-border-light p-0.5 overflow-hidden shrink-0 shadow-sm">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://picsum.photos/seed/user1/64/64')` }}
              ></div>
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate text-text-main">Alex Rivera</p>
                  <p className="text-[10px] text-text-muted uppercase tracking-tight">Pro Plan</p>
                </div>
                <span className="material-symbols-outlined text-text-muted text-lg">unfold_more</span>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-y-auto custom-scrollbar">
        {/* Mobile Header */}
        <div className="lg:hidden h-14 border-b border-border-light flex items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-40">
           <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 -ml-2">
             <span className="material-symbols-outlined">menu</span>
           </button>
           <h2 className="text-sm font-bold uppercase tracking-tight">Nexus KM</h2>
           <div className="size-8 rounded-full bg-slate-200"></div>
        </div>
        {children}
      </main>

      {/* Sidebar Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;
