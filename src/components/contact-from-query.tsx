"use client";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "./contact-form";
import { inquiryServices, inquirySources } from "@/lib/inquiry";
import { projects } from "@/lib/content";

export function ContactFromQuery() {
  const params = useSearchParams();
  const service =
    inquiryServices.find((s) => s.slug === params.get("paslauga"))?.title || "";
  const project =
    projects.find((p) => p.slug === params.get("projektas"))?.slug || "";
  const source =
    inquirySources.find((s) => s === params.get("is")) || "/kontaktai";
  return (
    <ContactForm
      key={`${service}:${project}:${source}`}
      initialService={service}
      initialProject={project}
      source={source}
    />
  );
}
