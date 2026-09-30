"use client";
import Link from "next/link";
import { ArrowUpRight, Check, LoaderCircle, RotateCcw } from "lucide-react";
import { useState, type FormEvent } from "react";
import { contact, projects } from "@/lib/content";
import { inquiryServices } from "@/lib/inquiry";

export function ContactForm({
  initialService = "",
  initialProject = "",
  source = "/",
}: {
  initialService?: string;
  initialProject?: string;
  source?: string;
}) {
  const [projectSlug, setProjectSlug] = useState(initialProject);
  const project = projects.find((p) => p.slug === projectSlug);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || status === "sending") return;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true)
        throw new Error(
          result.message ||
            "Nepavyko išsiųsti užklausos. Bandykite dar kartą arba susisiekite telefonu.",
        );
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "Siuntimas užtruko. Bandykite dar kartą arba susisiekite telefonu.",
      );
    }
  }
  if (status === "success")
    return (
      <div className="form-success" role="status">
        <span className="success-icon">
          <Check size={32} strokeWidth={1.5} />
        </span>
        <h3>Ačiū už pasitikėjimą.</h3>
        <p>
          Jūsų užklausa išsiųsta. Susisieksime jūsų nurodytu el. paštu arba
          telefonu ir aptarsime kitą žingsnį.
        </p>
        <button
          className="text-link"
          onClick={() => setStatus("idle")}
          type="button"
        >
          Pateikti kitą užklausą <RotateCcw size={16} />
        </button>
      </div>
    );
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-label="Projekto užklausa"
    >
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="project" value={projectSlug} />
      {project && (
        <div className="inquiry-context">
          <div>
            <span>Jus sudominęs projektas</span>
            <strong>{project.title}</strong>
          </div>
          <button
            type="button"
            onClick={() => setProjectSlug("")}
            aria-label="Pašalinti projekto nuorodą"
          >
            ×
          </button>
        </div>
      )}
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">
            Jūsų vardas <span>*</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Vardas, pavardė"
            required
            minLength={2}
            maxLength={100}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">
            El. paštas <span>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="vardas@imone.lt"
            required
            maxLength={254}
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Telefono numeris</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+370"
            maxLength={30}
          />
        </div>
        <div className="form-field">
          <label htmlFor="service">Kuo galime padėti?</label>
          <select id="service" name="service" defaultValue={initialService}>
            <option value="">Pasirinkite paslaugą</option>
            {inquiryServices.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-field message-field">
        <label htmlFor="message">
          Trumpai apie jūsų projektą <span>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Objekto vieta, numatomi darbai, jūsų lūkesčiai..."
          required
          minLength={10}
          maxLength={5000}
          rows={3}
        />
      </div>
      <div className="honey-field" aria-hidden="true">
        <label htmlFor="website">Svetainė</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          Susipažinau su{" "}
          <Link href="/privatumas" target="_blank">
            privatumo informacija
          </Link>{" "}
          ir sutinku, kad su manimi būtų susisiekta dėl užklausos.{" "}
          <span>*</span>
        </span>
      </label>
      {status === "error" && (
        <div className="form-error" role="alert">
          <p>{message}</p>
          <a href={`mailto:${contact.email}`}>
            Rašyti el. paštu <ArrowUpRight size={15} />
          </a>
        </div>
      )}
      <div className="form-submit">
        <span>* Privalomi laukai</span>
        <button
          type="submit"
          className="button button-dark"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              Siunčiama <LoaderCircle className="spinner" size={19} />
            </>
          ) : (
            <>
              Siųsti užklausą <ArrowUpRight size={19} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
