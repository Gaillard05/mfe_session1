import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const Breadcrumb = () => {
  // This would typically come from a router or props
  const paths = [
    { name: 'Accueil', path: '/' },
    { name: 'Films', path: '/films' },
    { name: 'Action', path: '/films/action' }
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-300 py-4">
      {paths.map((item, index) => (
        <React.Fragment key={item.path}>
          <span 
            className="hover:text-white cursor-pointer transition-colors"
            onClick={() => console.log(`Navigate to ${item.path}`)}
          >
            {item.name}
          </span>
          {index < paths.length - 1 && (
            <IoIosArrowForward className="text-gray-500" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb; 