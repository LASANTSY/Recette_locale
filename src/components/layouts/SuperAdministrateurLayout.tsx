import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import { 
  Users, 
  Settings,
} from 'lucide-react';
import { Navbar, Sidebar } from '../common/frame/IndexExport';
import { mockNotifications } from '../common/data/mockNotifications';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/auth';

type SidebarItem = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  route: string;
};

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const SuperAdministrateurLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>('dashboard');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const SIDEBAR_WIDTH_EXPANDED = 256;
  const SIDEBAR_WIDTH_COLLAPSED = 64;
  const NAVBAR_HEIGHT = 64;

  const sidebarItems: SidebarItem[] = [
    { id: 'Configuration', name: 'Configuration', icon: Settings, route: '/super-administrateur/configuration' },
    { id: 'Utilisateurs', name: 'Utilisateurs', icon: Users, route: '/super-administrateur/utilisateur' }
  ];

  const handleItemClick = (item: SidebarItem): void => {
    setActiveItem(item.id);
    navigate(item.route);
  };

  const handleLogout = (): void => {
    logout();
  };

  const handleNotificationClick = (notification: NotificationItem): void => {
    console.log('Notification cliquée:', notification);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const currentSidebarWidth = isSidebarCollapsed 
    ? SIDEBAR_WIDTH_COLLAPSED 
    : SIDEBAR_WIDTH_EXPANDED;

  return (
    <div className={`h-screen flex overflow-hidden ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar avec transition fluide */}
      {/* En mobile, le sidebar est positionné en fixed par Sidebar.tsx, donc on ne réserve pas de largeur ici */}
      {!isMobile && (
      <div 
        className="flex-none transition-all duration-300 ease-in-out"
        style={{ width: `${currentSidebarWidth}px` }}
      >
        <Sidebar 
          items={sidebarItems}
          activeItem={activeItem}
          onItemClick={handleItemClick}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          // accentColor="#3b82f6"
        />
      </div>
      )}
      {isMobile && (
        <Sidebar 
          items={sidebarItems}
          activeItem={activeItem}
          onItemClick={handleItemClick}
          isCollapsed={false}
          onToggleCollapse={toggleSidebar}
          // accentColor="#3b82f6"
        />
      )}
      {/* Conteneur du contenu principal avec transition */}
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
        {/* Navbar fixe */}
        <div 
          className="flex-none"
          style={{ height: `${NAVBAR_HEIGHT}px` }}
        >
          <Navbar
            userName={user?.userName || ""}
            userRole={user?.userRole || ""}
            userAvatar={user?.userAvatar}
            sidebarWidth={!isMobile ? currentSidebarWidth : 0}
            isSidebarCollapsed={isSidebarCollapsed}
            notifications={mockNotifications}
            onLogout={handleLogout}
            onNotificationClick={handleNotificationClick}
            onProfileClick={() => console.log('Profil cliqué')}
            onSettingsClick={() => console.log('Paramètres cliqués')}
            onToggleSidebar={toggleSidebar}
          />
        </div>
        {/* Zone de contenu principal scrollable avec animation fluide */}
        <main className="flex-1 overflow-y-auto p-4 transition-all duration-300 ease-in-out">
          <div className="h-full min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdministrateurLayout;