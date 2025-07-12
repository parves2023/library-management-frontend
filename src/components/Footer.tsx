import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="mt-12 border-t bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Logo or Name */}
        <div className="text-lg font-semibold">
          📚 BookShelf
        </div>

        {/* Center: Navigation */}
        <div className="flex gap-6 text-sm">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy-policy" className="hover:underline">Privacy</a>
        </div>

        {/* Right: Copyright */}
        <div className="text-sm">
          © {new Date().getFullYear()} BookShelf. All rights reserved.
        </div>
      </div>

      <Separator />
      <div className="text-center text-xs py-3 text-muted-foreground">
        Built with ❤️ by Parves 
        <a className="text-blue-600 underline font-bold" href="https://parvesmosarof.netlify.app/"> My Portfolio</a>
      </div>
    </footer>
  );
};

export default Footer;
