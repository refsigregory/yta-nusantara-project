import PropTypes from 'prop-types';
import { useSidebarContext } from '../context/useSidebar';
import { useEffect } from 'react';


const AdminHeader = ({ title, customAction }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useSidebarContext()
  
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 mb-[50px]">
      <header className="inline-flex items-center gap-8 text-dark-2">
        {/* Mobile Sidebar Toggler */}
        <button
          type='button'
          className="mobile-tablet"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg
            className="w-6 h-6 rounded text-dark-1 bg-slate-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            ></path>
          </svg>
        </button>
        <h1 className="text-2xl md:text-[32px] md:leading-9 font-bold">
          {title}
        </h1>
      </header>
      {customAction}
    </div>
  );
}

AdminHeader.propTypes = {
  title: PropTypes.node.isRequired,
  customAction: PropTypes.node,
};

export default AdminHeader;
