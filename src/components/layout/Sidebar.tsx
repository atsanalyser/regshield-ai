import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Kanban, 
  BellRing, 
  FileText, 
  BarChart3, 
  Settings,
  ShieldCheck
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Onboarding', path: '/onboarding', icon: UserPlus },
  { name: 'Workflow', path: '/workflow', icon: Kanban },
  { name: 'Alerts', path: '/alerts', icon: BellRing },
  { name: 'Templates', path: '/templates', icon: FileText },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-brand text-gray-300 flex flex-col h-full flex-shrink-0 shadow-xl z-20">
      <div className="p-6 flex items-center space-x-3 text-white">
        <div className="bg-primary-500 p-2 rounded-lg">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">RegShield AI</span>
      </div>
      
      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Menu
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => twMerge(
              clsx(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium",
                isActive 
                  ? "bg-primary-600/20 text-primary-400" 
                  : "hover:bg-gray-800/50 hover:text-white"
              )
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={clsx("w-5 h-5", isActive ? "text-primary-400" : "text-gray-400 group-hover:text-white")} />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <NavLink
            to="/settings"
            className={({ isActive }) => twMerge(
              clsx(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium",
                isActive 
                  ? "bg-primary-600/20 text-primary-400" 
                  : "hover:bg-gray-800/50 hover:text-white"
              )
            )}
          >
            {({ isActive }) => (
              <>
                <Settings className={clsx("w-5 h-5", isActive ? "text-primary-400" : "text-gray-400 group-hover:text-white")} />
                <span>Settings</span>
              </>
            )}
        </NavLink>
      </div>
    </div>
  );
}
