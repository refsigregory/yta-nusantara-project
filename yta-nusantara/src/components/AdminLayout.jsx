import PropTypes from 'prop-types';
import { useAuth } from '../context/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const auth = useAuth();
  let navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'is-active' : '';
  };

  return (
    <div className="flex min-h-screen pb-10 font-primary">
          {/* START: Sidebar */}
          <aside className="bg-white lg:float-left w-full max-w-xs lg:max-w-max px-[30px] pt-7 lg:pt-[50px] pb-[70px] hidden lg:flex flex-col h-full min-h-screen lg:max-h-full absolute lg:static lg:left-0 z-50 shadow-md lg:shadow-none overflow-y-auto lg:overflow-y-visible max-h-screen">
            {/* X icon */}
            <a
              href="javascript:void(0)"
              className="block w-6 h-6 mb-4 ml-auto lg:hidden"
              id="navbarToggler"
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
            </a>
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
                      className="transition-all group-hover:filter-white"
                      alt=""
                    />
                    Program
                  </a>
                  <a href="/admin/sub-program/" className={`group dashboard-link ${isActive('/admin/sub-program/')}`}>
                    <img
                      src="/assets/svg/ic-data.svg"
                      className="transition-all group-hover:filter-white"
                      alt=""
                    />
                    Sub-Program
                  </a>
                  <a href="/admin/workshop/" className={`group dashboard-link ${isActive('/admin/workshop/')}`}>
                    <img
                      src="/assets/svg/ic-people.svg"
                      className="transition-all group-hover:filter-white"
                      alt=""
                    />
                    Workshop
                  </a>
                  <a href="#" className={`group dashboard-link ${isActive('/admin/settings/')}`}>
                    <img
                      src="/assets/svg/ic-gear.svg"
                      className="transition-all group-hover:filter-white"
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
                      className="transition-all group-hover:filter-white"
                      alt=""
                    />
                    Logout
                  </div>
                </div>
              </section>
            </div>
          </aside>
          <div
            id="backdropDrawer"
            className="fixed z-40 hidden w-screen h-screen bg-gray-900 bg-opacity-50"
          />
          {/* END: Sidebar */}
          <main className="lg:pt-[50px] lg:px-[50px] p-4 w-full lg:border-l lg:border-l-borderLight">
            {children}
          </main>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
