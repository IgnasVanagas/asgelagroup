"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { contact } from "@/lib/content";
import { inquiryHref } from "@/lib/inquiry";

export function MobileContact() {
  const path = usePathname();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => {
      const zone = document
        .querySelector("[data-contact-zone]")
        ?.getBoundingClientRect();
      setVisible(
        window.scrollY > 420 &&
          !(zone && zone.top < window.innerHeight && zone.bottom > 0),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [path]);
  if (
    !visible ||
    path === "/kontaktai" ||
    path === "/privatumas" ||
    path === "/nuotraukos"
  )
    return null;
  return (
    <nav className="mobile-contact-bar" aria-label="Greitas susisiekimas">
      <a href={contact.phoneHref}>
        <Phone size={16} />
        Skambinti
      </a>
      <Link href={inquiryHref({ source: path })}>
        Aptarkime projektą <ArrowUpRight size={17} />
      </Link>
    </nav>
  );
}
