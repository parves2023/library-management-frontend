import { Link, useNavigate } from "react-router";
import {
  BookOpen,
  BookMarked,
  BookPlus,
  LogIn,
  Home,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Title */}
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold tracking-wide cursor-pointer"
      >
        People's Library
      </div>

      {/* Dropdown Menu for Navigation */}
      <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
        <Link to="/" className="flex items-center gap-1 hover:text-yellow-300 transition">
          <Home size={18} /> Home
        </Link>
        <Link to="/add-book" className="flex items-center gap-1 hover:text-yellow-300 transition">
          <BookPlus size={18} /> Add Book
        </Link>
        <Link to="/all-books" className="flex items-center gap-1 hover:text-yellow-300 transition">
          <BookOpen size={18} /> Show All Books
        </Link>
        <Link to="/borrowed-books" className="flex items-center gap-1 hover:text-yellow-300 transition">
          <BookMarked size={18} /> Borrowed Books
        </Link>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white hover:text-yellow-300">
              <Menu size={22} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white text-black w-48">
            <DropdownMenuItem onClick={() => navigate("/")}>
              <Home className="mr-2" size={18} /> Home
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/add-book")}>
              <BookPlus className="mr-2" size={18} /> Add Book
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/all-books")}>
              <BookOpen className="mr-2" size={18} /> Show All Books
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/borrowed-books")}>
              <BookMarked className="mr-2" size={18} /> Borrowed Books
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mode Toggle and Login */}
      <div className="flex items-center space-x-4 text-black">
        <ModeToggle />
        <Button
          onClick={() => navigate("/login")}
          variant="secondary"
          className="flex items-center gap-2 bg-yellow-400 text-black hover:bg-yellow-300 transition"
        >
          <LogIn size={18} />
          Login
        </Button>
      </div>
    </nav>
  );
}
