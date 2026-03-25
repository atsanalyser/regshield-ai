import { Search, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-10 shadow-sm">
      <div className="flex items-center text-sm text-gray-500">
        <Search className="w-4 h-4 mr-2" />
        <span className="cursor-text">Search customer, case, or alert... (CMD+K)</span>
      </div>
      
      <div className="flex items-center space-x-5">
        <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary-500 to-primary-700 flex items-center justify-center text-white font-medium shadow-md shadow-primary-500/20 ring-2 ring-white cursor-pointer hover:shadow-lg transition-shadow">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
