"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";
import { contact } from "@/lib/content";
import { inquiryHref } from "@/lib/inquiry";

const links = [
  ["Projektai", "projektai"],
  ["Paslaugos", "paslaugos"],
  ["Apie mus", "apie-mus"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const elements = [
          toggle.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = elements[0],
          last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const resize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("keydown", keydown);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = before;
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("resize", resize);
    };
  }, [open]);

  const href = (id: string) => `/${id}`;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="brand-link"
          aria-label="Asgela Group – pradžia"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </Link>
        <nav className="desktop-nav" aria-label="Pagrindinė navigacija">
          {links.map(([label, id]) => (
            <Link
              key={id}
              href={href(id)}
              aria-current={
                path === href(id) || path.startsWith(`${href(id)}/`)
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          className="header-contact"
          href={inquiryHref({ source: path })}
          aria-current={path === "/kontaktai" ? "page" : undefined}
        >
          Aptarkime projektą <ArrowUpRight size={17} strokeWidth={1.5} />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Uždaryti meniu" : "Atidaryti meniu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          ref={menu}
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobilioji navigacija"
        >
          {[...links, ["Kontaktai", "kontaktai"]].map(([label, id], i) => (
            <Link
              key={id}
              href={href(id)}
              onClick={() => setOpen(false)}
              aria-current={
                path === href(id) || path.startsWith(`${href(id)}/`)
                  ? "page"
                  : undefined
              }
            >
              <span className="menu-number">0{i + 1}</span>
              {label}
              <ArrowUpRight />
            </Link>
          ))}
          <a className="mobile-phone" href={contact.phoneHref}>
            {contact.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
