import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-grow p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
