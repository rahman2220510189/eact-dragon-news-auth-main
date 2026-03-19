import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import LatestNews from "../components/LatestNews";
import LeftNavbar from "../components/layout-component/LeftNavbar";
import RightNav from "../components/layout-component/RightNav";
import MobileNav from "../components/layout-component/MobileNav";

const HomeLayout = () => {
  return (
    <div className="font-poppins min-h-screen bg-base-200 dark:bg-gray-900 dark:text-white">

      {/* Site Header — Logo + Date */}
      <header className="bg-base-100 dark:bg-gray-800 shadow-sm">
        <Header />
        <section className="w-11/12 mx-auto">
          <LatestNews />
        </section>
      </header>

      {/* Mobile Nav Bar — only visible on small screens */}
      <div className="md:hidden w-full bg-base-100 dark:bg-gray-800 border-b border-base-200 dark:border-gray-700">
        <MobileNav />
      </div>

      {/* Main 3-column Layout */}
      <main className="w-11/12 mx-auto pt-5 pb-10 grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* Left Sidebar — Categories (hidden on mobile, shown on md+) */}
        <aside className="hidden md:block md:col-span-3">
          <LeftNavbar />
        </aside>

        {/* Center — News Feed */}
        <section className="col-span-1 md:col-span-6">
          <Outlet />
        </section>

        {/* Right Sidebar — hidden on mobile, shown on md+ */}
        <aside className="hidden md:block md:col-span-3">
          <RightNav />
        </aside>

      </main>
    </div>
  );
};

export default HomeLayout;