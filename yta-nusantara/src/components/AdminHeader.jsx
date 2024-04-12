import PropTypes from 'prop-types';

const AdminHeader = ({ title, customAction }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 mb-[50px]">
      <header className="text-dark-2 inline-flex items-center gap-8">
        {/* Mobile Sidebar Toggler */}
        <a
          href="javascript:void(0)"
          className="mobile-tablet"
          id="navbarTogglerHead"
        >
          <svg
            className="text-dark-1 w-6 h-6 bg-slate-100 rounded"
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
        </a>
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
