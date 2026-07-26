import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLogOut } from '../hooks/useLogOut';
import { useNavigation } from '../Context/NavigationContext';
import Logo from '../Images/Logo-v2.PNG';
import {
  HiHome,
  HiCheckCircle,
  HiUserGroup,
  HiUsers,
  HiArrowRightOnRectangle,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';

const NAV_LINKS = [
  { to: '/',        label: 'Home',    Icon: HiHome },
  { to: '/task',    label: 'Tasks',   Icon: HiCheckCircle },
  { to: '/groups',  label: 'Groups',  Icon: HiUserGroup },
  { to: '/friends', label: 'Friends', Icon: HiUsers },
];

const VerticalNavigation = () => {
  const { logout } = useLogOut();
  const { closeMenu, setCloseMenu } = useNavigation();
  const { pathname } = useLocation();
  const collapsed = closeMenu;

  return (
    <aside
      className={`
        flex flex-col h-screen bg-sidebar border-r border-border
        transition-all duration-300 ease-in-out shrink-0
        ${collapsed ? 'w-16' : 'w-56'}
      `}
    >
      {/* Logo + toggle */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-border min-h-[64px]">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <img src={Logo} alt="GoalTrack" className="h-8 w-auto shrink-0" />
            <span className="text-accent font-semibold text-sm tracking-widest whitespace-nowrap">
              GOALTRACK
            </span>
          </div>
        )}
        {collapsed && (
          <img src={Logo} alt="GoalTrack" className="h-8 w-auto mx-auto" />
        )}
        <button
          onClick={() => setCloseMenu(!closeMenu)}
          className="ml-auto p-1 rounded text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors shrink-0"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <HiChevronRight className="w-4 h-4" /> : <HiChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {NAV_LINKS.map(({ to, label, Icon }) => {
          const active = pathname === to || (to !== '/' && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-150
                ${active
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-transparent'
                }
              `}
            >
              <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-accent' : ''}`} />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full
            text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors duration-150"
        >
          <HiArrowRightOnRectangle className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
};

export default VerticalNavigation;
