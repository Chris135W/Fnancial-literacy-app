"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Stock Basics",
    href: "/stocks",
  },
  {
    title: "Credit Cards",
    href: "/credit-cards",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center border-b px-4 md:hidden">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">💰</span>
          <span>FinLit</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">
          For educational purposes only. Not financial advice.
        </p>
      </div>
    </aside>
  );
}
