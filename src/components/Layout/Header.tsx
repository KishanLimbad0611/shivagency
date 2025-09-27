// import React from 'react';
// import { Menu, Bell, User } from 'lucide-react';

// interface HeaderProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
// }

// const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
//           >
//             <Menu size={24} />
//           </button>
          
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800">
//               Stationary Management System
//             </h2>
//             <p className="text-sm text-gray-600">
//               Manage your inventory, suppliers, and sales efficiently
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-4">
//           <button className="text-gray-500 hover:text-gray-700 relative">
//             <Bell size={20} />
//             <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
//           </button>
          
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//               <User size={16} className="text-white" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-700">Admin User</p>
//               <p className="text-xs text-gray-500">Store Manager</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
          >
            <Menu size={24} />
          </button>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Stationary Management System
            </h2>
            <p className="text-sm text-gray-600">
              Manage your inventory, suppliers, and sales efficiently
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 p-1 rounded transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;