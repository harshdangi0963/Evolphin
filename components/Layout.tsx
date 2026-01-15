
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
        className={`fixed inset-y-0 left-0 z-50 bg-white/80 backdrop-blur-xl border-r border-border-light flex flex-col transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform lg:relative lg:translate-x-0 overflow-hidden shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${isCollapsed ? 'lg:w-[78px]' : 'lg:w-[240px]'}`}
      >
        {/* Logo Section */}
        <div className="flex items-center h-20 px-5 shrink-0 overflow-hidden">
          <div className="size-10 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-lg shrink-0 transition-transform active:scale-90 cursor-pointer">
            <span className="material-symbols-outlined text-xl font-bold">blur_on</span>
          </div>
          <div className={`ml-4 transition-all duration-300 ${isCollapsed ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
            <h1 className="text-[13px] font-black leading-none text-slate-900 uppercase tracking-tight whitespace-nowrap">Nexus OS</h1>
            <p className="text-[9px] text-primary font-black uppercase tracking-widest mt-1 whitespace-nowrap">v.4.0 Neural</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1.5 mt-4 overflow-x-hidden overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center h-11 px-[10px] rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive(item.path)
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                  : 'text-text-muted hover:bg-slate-100 hover:text-text-main border border-transparent'
              }`}
            >
              <div className="size-9 flex items-center justify-center shrink-0">
                <span className={`material-symbols-outlined text-[22px] transition-transform duration-500 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
              </div>
              <span className={`ml-3 text-[13px] font-bold whitespace-nowrap transition-all duration-300 ease-out ${isCollapsed ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                {item.name}
              </span>
              
              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                 <div className="absolute left-full ml-4 px-3 py-2 bg-slate-950 text-white text-[11px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] shadow-2xl translate-x-2 group-hover:translate-x-0">
                    {item.name}
                 </div>
              )}
            </Link>
          ))}
          
          <div className="h-px bg-slate-100 my-6 mx-2"></div>
          
          <button className="w-full flex items-center h-11 px-[10px] rounded-xl text-text-muted hover:bg-slate-100 hover:text-text-main transition-all group overflow-hidden">
            <div className="size-9 flex items-center justify-center shrink-0">
               <span className="material-symbols-outlined text-[22px] group-hover:rotate-45 transition-transform duration-500">settings</span>
            </div>
            <span className={`ml-3 text-[13px] font-bold whitespace-nowrap transition-all duration-300 ease-out ${isCollapsed ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
              Settings
            </span>
          </button>
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-slate-100 mt-auto bg-slate-50/50">
          <div className="flex items-center h-14 px-1 rounded-2xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all cursor-pointer group overflow-hidden">
            <div className="size-10 rounded-full border-2 border-white ring-1 ring-slate-200 overflow-hidden shrink-0 shadow-sm">
              <img src="https://picsum.photos/seed/user1/64/64" className="w-full h-full object-cover" alt="User" />
            </div>
            <div className={`ml-3 flex-1 transition-all duration-300 flex items-center justify-between overflow-hidden ${isCollapsed ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
              <div className="truncate pr-2">
                <p className="text-[11px] font-black truncate text-slate-900 uppercase tracking-tight leading-none">Alex Rivera</p>
                <p className="text-[9px] text-primary font-black uppercase tracking-widest mt-1">Operator</p>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm shrink-0">unfold_more</span>
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
           <h2 className="text-[11px] font-black uppercase tracking-widest">Nexus KM</h2>
           <div className="size-8 rounded-full bg-slate-100 border border-slate-200"></div>
        </div>
        {children}
      </main>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-md z-40 lg:hidden animate-in fade-in duration-500"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;
