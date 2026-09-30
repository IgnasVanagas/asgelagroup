import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <h1>
        Šio puslapio
        <br />
        neradome.
      </h1>
      <p>Grįžkite į pradžią ir atraskite mūsų darbus.</p>
      <Link href="/" className="button button-dark">
        Į pradžią <ArrowUpRight size={19} />
      </Link>
    </main>
  );
}
