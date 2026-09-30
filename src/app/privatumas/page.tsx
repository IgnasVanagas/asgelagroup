import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { contact } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Privatumo informacija",
  "Kaip Asgela Group naudoja projekto užklausoje pateiktą informaciją ir kaip su mumis susisiekti dėl jūsų duomenų.",
  "/privatumas",
);

export default function Privacy() {
  return (
    <main id="main" className="container legal-page">
      <Link href="/kontaktai" className="back-link">
        <ArrowLeft size={16} />
        Grįžti į kontaktus
      </Link>
      <h1>Privatumo informacija.</h1>
      <p>
        Užklausų duomenis gauna ir tvarko „Asgela Group“ komanda. Dėl jūsų
        duomenų tvarkymo galite kreiptis el. paštu{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> arba telefonu{" "}
        <a href={contact.phoneHref}>{contact.phone}</a>.
      </p>
      <h2>Užklausos duomenys</h2>
      <p>
        Užpildydami formą pateikiate savo vardą, el. pašto adresą, žinutę ir,
        jei pasirenkate, telefono numerį bei dominančią paslaugą. Šiuos duomenis
        naudojame atsakymui į jūsų užklausą ir galimo projekto aptarimui.
        Laukai, pažymėti žvaigždute, būtini užklausai pateikti.
      </p>
      <h2>Kam naudojama jūsų informacija</h2>
      <p>
        Kartu su užklausa perduodamas puslapis, iš kurio ją pradėjote, ir jūsų
        pasirinkto projekto nuoroda, jei tokia buvo. Tai padeda suprasti
        užklausos kontekstą. Naršymo istorija ir asmens identifikatoriai šiam
        tikslui nesaugomi.
      </p>
      <p>
        Formoje pateikta informacija skirta tik bendravimui dėl jūsų užklausos.
        Ji nenaudojama naujienlaiškiams ar reklamai siųsti. Užklausos gavėjai
        yra komandos nariai, atsakingi už klientų konsultavimą.
      </p>
      <h2>Techninis duomenų perdavimas</h2>
      <p>
        Užklausos perduodamos el. paštu, naudojant el. laiškų pristatymo
        paslaugą „Resend“. Svetainės ir el. pašto paslaugų teikėjai gali
        tvarkyti techninius duomenis, reikalingus užklausai pristatyti ir
        paslaugai veikti.
      </p>
      <h2>Jūsų pasirinkimai</h2>
      <p>
        Galite paprašyti informacijos apie pateiktus duomenis, juos patikslinti
        ar paprašyti ištrinti. Dėl to parašykite mums iš užklausoje nurodyto el.
        pašto adreso. Jei nenorite naudoti formos, galite susisiekti telefonu.
      </p>
      <h2>Slapukai ir analitika</h2>
      <p>
        Šioje svetainėje nenaudojami reklamos ar lankytojų analitikos slapukai.
        Šriftai ir nuotraukos pateikiami iš svetainės serverio.
      </p>
    </main>
  );
}
