import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}
