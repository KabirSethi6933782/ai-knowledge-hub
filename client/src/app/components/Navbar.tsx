"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Uses lucide-react for nice icons

const navItems = [
  { name: "Home", href: "/" },
  { name: "Documents", href: "/documents" },
  { name: "Upload", href: "/documents/upload" },
  // Add more items as you expand!
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-neutral-900 shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo/Brand */}
        <span className="font-bold text-xl text-blue-700 tracking-tight">
          AI Knowledge Hub
        </span>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-xl font-medium transition ${
                pathname === item.href
                  ? "bg-blue-700 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-neutral-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Hamburger Button */}
        <button
          className="md:hidden flex items-center p-2 rounded focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 border-t dark:border-neutral-800 px-4 pb-4 animate-fade-in-down">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)} // close menu on click
                className={`block px-3 py-2 rounded-xl font-medium transition ${
                  pathname === item.href
                    ? "bg-blue-700 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-neutral-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
