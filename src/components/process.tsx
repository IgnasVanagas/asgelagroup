import { ArrowUpRight } from "lucide-react";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <div className="process-grid process-three">
      {processSteps.map((step, i) => (
        <div className="process-step" key={step.title}>
          <div>
            <span>0{i + 1}</span>
            <ArrowUpRight size={21} strokeWidth={1} aria-hidden="true" />
          </div>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>
      ))}
    </div>
  );
}
