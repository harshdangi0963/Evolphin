
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navItems = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Collections', path: '/collections', icon: 'folder' },
    { name: 'Team', path: '/collaborators', icon: 'group' },
    { name: 'History', path: '/history', icon: 'schedule' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-bg font-sans">
      {/* Sidebar */}
      <aside
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        className={`fixed inset-y-0 left-0 z-50 bg-bg-elevated border-r border-edge flex flex-col transition-all duration-200 ease-smooth transform lg:relative lg:translate-x-0 overflow-hidden
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${isCollapsed ? 'lg:w-16' : 'lg:w-52'}`}
      >
        {/* Logo */}
        <div className="flex items-center h-14 px-4 shrink-0 border-b border-edge">
          <div className="size-8 rounded-md bg-accent flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-bg text-base">hub</span>
          </div>
          <div className={`ml-3 transition-all duration-200 ease-smooth ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
            <span className="text-sm font-semibold text-content whitespace-nowrap">Nexus</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 pt-4 space-y-1 overflow-x-hidden overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center h-10 px-2 rounded-lg transition-colors group ${isActive(item.path)
                  ? 'bg-bg-subtle text-content'
                  : 'text-content-secondary hover:bg-bg-subtle hover:text-content'
                }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>

              <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-200 ease-smooth ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                }`}>
                {item.name}
              </span>

              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-bg-elevated border border-edge text-content text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-md">
                  {item.name}
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-2 border-t border-edge">
          <div className="flex items-center h-10 px-2 rounded-lg hover:bg-bg-subtle transition-colors cursor-pointer">
            <div className="size-7 rounded-full bg-bg-muted overflow-hidden shrink-0">
              <img src="https://picsum.photos/seed/user1/56/56" alt="" className="w-full h-full object-cover" />
            </div>
            <div className={`ml-3 transition-all duration-200 ease-smooth ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
              <p className="text-sm font-medium text-content whitespace-nowrap">Alex Rivera</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-y-auto custom-scrollbar bg-bg">
        {/* Mobile Header */}
        <div className="lg:hidden h-14 border-b border-edge flex items-center justify-between px-4 bg-bg-elevated sticky top-0 z-40">
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="btn btn-ghost btn-icon-sm">
            <span className="material-symbols-outlined text-content">menu</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-accent flex items-center justify-center">
              <span className="material-symbols-outlined text-bg text-sm">hub</span>
            </div>
            <span className="text-sm font-semibold text-content">Nexus</span>
          </div>
          <div className="size-8 rounded-full overflow-hidden">
            <img src="https://picsum.photos/seed/user1/56/56" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        {children}
      </main>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
