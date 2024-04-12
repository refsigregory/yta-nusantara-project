import PropTypes from 'prop-types';

function LoginForm({ onSubmit }) {
  return (
    <div className="flex min-h-screen font-primary">
      <section className="w-full p-5 bg-[#FCFCFC] rounded-2xl flex flex-col max-w-[400px] m-auto h-full">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 items-center"
        >
          <img src="/assets/svg/logo.svg" className="w-28 h-28" alt="" />
          {/* form group */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-base font-medium text-dark-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary placeholder:text-dark-3 text-dark-1"
              defaultValue=""
            />
          </div>
          {/* form group */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-base font-medium text-dark-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="px-4 py-3 text-base bg-transparent border-2 rounded-xl outline-none border-slate-200 focus:border-primary placeholder:text-dark-3 text-dark-1"
              defaultValue=""
            />
          </div>
          <div className="mt-10 w-full">
            <button type="submit" className="btn-primary w-full text-base">
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
