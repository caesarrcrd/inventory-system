import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar className="shadow-md">
        <NavbarBrand className="font-bold text-lg">Inventory System</NavbarBrand>
        <NavbarContent justify="end">
          {menuItems.map((item) => (
            <NavbarItem key={item.href} isActive={router.pathname === item.href}>
              <Link
                href={item.href}
                className={`px-3 py-1 rounded-md ${
                  router.pathname === item.href
                    ? "bg-primary-100 text-primary"
                    : "hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm">
        © {new Date().getFullYear()} Inventory System - All rights reserved
      </footer>
    </div>
  );
}
