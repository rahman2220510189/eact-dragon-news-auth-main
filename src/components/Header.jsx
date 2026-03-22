import moment from "moment";

const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 py-4 bg-base-100 dark:bg-gray-800">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <span className="text-5xl select-none">🐉</span>
        <div className="flex flex-col">
          <span
            className="text-red-600 font-bold tracking-widest text-lg leading-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            THE DRAGON
          </span>
          <span
            className="text-gray-900 dark:text-white font-bold text-2xl leading-none mt-0.5"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "0.3em" }}
          >
            NEWS
          </span>
          <div className="h-0.5 bg-red-600 mt-1 rounded-full" />
        </div>
      </div>

      {/* Tagline */}
      <p className="text-gray-400 text-sm italic">
        Journalism Without Fear or Favour
      </p>

      {/* Date */}
      <p className="text-gray-500 text-xs">
        {moment().format("dddd, MMMM Do YYYY")}
      </p>

    </div>
  );
};

export default Header;