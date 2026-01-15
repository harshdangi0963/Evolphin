
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
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-border-light flex flex-col transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] transform lg:relative lg:translate-x-0 overflow-hidden
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-64'}`}
      >
        {/* Logo Section */}
        <div className="flex items-center h-20 px-[18px] shrink-0 overflow-hidden">
          <div className="size-9 rounded-xl bg-text-main flex items-center justify-center text-white shadow-sm shrink-0">
            <span className="material-symbols-outlined text-xl">terminal</span>
          </div>
          <div className={`ml-4 transition-all duration-300 ease-out ${isCollapsed ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
            <h1 className="text-sm font-extrabold leading-none text-text-main uppercase tracking-tighter whitespace-nowrap">Nexus KM</h1>
            <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1 font-bold whitespace-nowrap">Workspace</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 mt-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center h-11 px-[10px] rounded-xl transition-all duration-200 group relative overflow-hidden ${
                isActive(item.path)
                  ? 'bg-slate-50 text-text-main border border-border-light shadow-sm'
                  : 'text-text-muted hover:bg-slate-50/80 hover:text-text-main border border-transparent'
              }`}
            >
              <span className={`material-symbols-outlined shrink-0 text-[24px] transition-colors ${isActive(item.path) ? 'text-primary' : 'group-hover:text-primary'}`}>
                {item.icon}
              </span>
              <span className={`ml-4 text-sm whitespace-nowrap transition-all duration-300 ease-out ${isCollapsed ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'} ${isActive(item.path) ? 'font-bold' : 'font-medium'}`}>
                {item.name}
              </span>
              {isCollapsed && (
                 <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                 </div>
              )}
            </Link>
          ))}
          
          <div className="h-px bg-border-light my-4 mx-2"></div>
          
          <button className="w-full flex items-center h-11 px-[10px] rounded-xl text-text-muted hover:bg-slate-50/80 hover:text-text-main transition-all group overflow-hidden">
            <span className="material-symbols-outlined shrink-0 text-[24px] group-hover:text-primary">settings</span>
            <span className={`ml-4 text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out ${isCollapsed ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
              Settings
            </span>
          </button>
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-border-light mt-auto">
          <div className="flex items-center h-14 px-1 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group overflow-hidden">
            <div className="size-10 rounded-full border border-border-light p-0.5 overflow-hidden shrink-0 shadow-sm">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://picsum.photos/seed/user1/64/64')` }}
              ></div>
            </div>
            <div className={`ml-3 flex-1 transition-all duration-300 ease-out flex items-center justify-between overflow-hidden ${isCollapsed ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
              <div className="truncate pr-2">
                <p className="text-xs font-bold truncate text-text-main">Alex Rivera</p>
                <p className="text-[10px] text-text-muted uppercase tracking-tight">Pro Plan</p>
              </div>
              <span className="material-symbols-outlined text-text-muted text-lg shrink-0">unfold_more</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
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

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;
