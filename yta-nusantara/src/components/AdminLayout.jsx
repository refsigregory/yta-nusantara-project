import PropTypes from 'prop-types';
import { useAuth } from '../context/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarContext } from '../context/useSidebar';
import { useEffect, useState } from 'react';

const AdminLayout = ({ children }) => {
  const auth = useAuth();
  let navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'is-active' : '';
  };

  useEffect(() => {
    if(!isMobile) {
      setIsSidebarOpen(true)
    }

    const handleScreenResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if(isMobile) {
        setIsSidebarOpen(false)
      } else {
          setIsSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleScreenResize);

    return () => {
      document.removeEventListener('resize', handleScreenResize);
    };
  }, [isMobile])

  return (
    <SidebarContext.Provider value={[isSidebarOpen, setIsSidebarOpen]}>
      <div className="flex min-h-screen pb-10 font-primary">
            {/* START: Sidebar */}
            {
              isSidebarOpen &&
              <aside className="bg-white lg:float-left w-full max-w-xs lg:max-w-max px-[30px] pt-7 lg:pt-[50px] pb-[70px] flex flex-col h-full min-h-screen lg:max-h-full absolute lg:static lg:left-0 z-50 shadow-md lg:shadow-none overflow-y-auto lg:overflow-y-visible max-h-screen">
                {/* X icon */}
                <button
                  type='button'
                  className="block w-6 h-6 mb-4 ml-auto lg:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {/* Logo */}
                <a href="/admin/program/">
                  <img
                    src="/assets/svg/logo.svg"
                    className="w-auto h-20 lg:mx-auto"
                    alt=""
                  />
                </a>
                {/* Dashboard Menu Sections */}
                <div className="flex flex-col w-full gap-10 mt-[50px]">
                  <section>
                    <div className="flex flex-col gap-[14px]">
                      <a href="/admin/program/" className={`group dashboard-link ${isActive('/admin/program/')}`}>
                        <img
                          src="/assets/svg/ic-document.svg"
                          className="transition-all group-hover:filter-white group-[.is-active]:filter-white"
                          alt=""
                        />
                        Program
                      </a>
                      <a href="/admin/sub-program/" className={`group dashboard-link ${isActive('/admin/sub-program/')}`}>
                        <img
                          src="/assets/svg/ic-data.svg"
                          className="transition-all group-hover:filter-white group-[.is-active]:filter-white"
                          alt=""
                        />
                        Sub-Program
                      </a>
                      <a href="/admin/workshop/" className={`group dashboard-link ${isActive('/admin/workshop/')}`}>
                        <img
                          src="/assets/svg/ic-people.svg"
                          className="transition-all group-hover:filter-white group-[.is-active]:filter-white"
                          alt=""
                        />
                        Workshop
                      </a>
                      <a href="/admin/setting" className={`group dashboard-link ${isActive('/admin/settings/')}`}>
                        <img
                          src="/assets/svg/ic-gear.svg"
                          className="transition-all group-hover:filter-white group-[.is-active]:filter-white"
                          alt=""
                        />
                        Settings
                      </a>
                      <div
                        className="group dashboard-link"
                        onClick={() => {
                          auth.signout(() => navigate("/"));
                        }}
                        >
                        <img
                          src="/assets/svg/ic-logout.svg"
                          className="transition-all group-hover:filter-white group-[.is-active]:filter-white"
                          alt=""
                        />
                        Logout
                      </div>
                    </div>
                  </section>
                </div>
              </aside>
            }

            {
              (isSidebarOpen && isMobile) &&
              <div
                id="backdropDrawer"
                className="fixed z-40 w-screen h-screen bg-gray-900 bg-opacity-50"
              />
            }
            {/* END: Sidebar */}
            <main className="lg:pt-[50px] lg:px-[50px] p-4 w-full lg:border-l lg:border-l-borderLight">
              {children}
            </main>
      </div>
    </SidebarContext.Provider>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
