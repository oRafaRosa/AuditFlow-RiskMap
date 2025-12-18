import React from 'react';
import { LayoutDashboard, Grid3X3, Shield, FileText, Settings, UserCircle, LogOut, Menu, GitFork, ClipboardList, Info, AppWindow } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user?: User;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onNavigate, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const NavItem = ({ page, icon: Icon, label }: any) => (
    <button
      onClick={() => onNavigate(page)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4
        ${currentPage === page 
          ? 'bg-blue-50 text-brand-blue border-brand-blue' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-transparent'
        }`}
    >
      <Icon size={18} />
      {sidebarOpen && <span>{label}</span>}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-brand-bg">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 text-gray-800 flex flex-col transition-all duration-300 fixed h-full z-20 shadow-xl`}>
        <div className="h-24 flex items-center justify-between px-4 border-b border-gray-100">
          {sidebarOpen ? (
            <img 
              src="https://i.postimg.cc/bv4S9DFS/logo.png" 
              alt="AuditFlow" 
              className="h-20 w-auto object-contain"
            />
          ) : (
            <div className="font-bold text-xl text-brand-blue mx-auto">AF</div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
            <Menu size={16} />
          </button>
        </div>

        <div className="flex-1 py-6 space-y-1 overflow-y-auto">
          <NavItem page="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem page="matrix" icon={Grid3X3} label="Mapa de Riscos" />
          <div className="my-2 border-t border-gray-100 mx-4"></div>
          <NavItem page="processes" icon={GitFork} label="Processos" />
          <NavItem page="risks" icon={FileText} label="Riscos" />
          <NavItem page="controls" icon={Shield} label="Controles" />
          <NavItem page="action-plans" icon={ClipboardList} label="Planos de Ação" />
          <div className="my-2 border-t border-gray-100 mx-4"></div>
          <NavItem page="apps" icon={AppWindow} label="Nossos Apps" />
          <NavItem page="about" icon={Info} label="Sobre" />
          <NavItem page="admin" icon={Settings} label="Configurações" />
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center font-bold text-sm text-white shadow-lg ring-2 ring-white">
              {user?.name.charAt(0)}
            </div>
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate text-gray-900">{user?.name}</p>
                <p className="text-[10px] text-gray-500 truncate uppercase tracking-wider">{user?.role.replace('_', ' ')}</p>
              </div>
            )}
            {sidebarOpen && <LogOut size={16} className="text-gray-400 cursor-pointer hover:text-red-600 transition-colors" />}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-10 flex items-center justify-between px-8 shadow-sm backdrop-blur-sm bg-white/90">
           <div className="flex items-center gap-2 text-gray-500">
              <span className="text-xs font-semibold uppercase tracking-wider bg-gray-100 px-2 py-1 rounded text-gray-600">
                Grupo Casas Bahia (Demo)
              </span>
           </div>
           <div className="flex items-center gap-4">
              <div className="text-sm text-right hidden sm:block">
                <p className="text-gray-900 font-medium">Ciclo de Auditoria 2025</p>
                <p className="text-xs text-gray-500">Atualizado há 2h</p>
              </div>
           </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
          {children}
        </div>
      </main>
    </div>
  );
};
