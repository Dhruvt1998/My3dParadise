import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";

const steps = [
  ["01", "Send the brief", "Share your file, dimensions, use case, quantity, and desired finish."],
  ["02", "Review", "The model is checked for printability, tolerances, material, and production approach."],
  ["03", "Print", "The part is produced, monitored, cleaned, and finished to the agreed specification."],
  ["04", "Deliver", "You receive the finished part and can request the next iteration when needed."]
];

export function ProcessSection() {
  return (
    <section className="section" id="process">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="A simple workflow that leaves room to iterate."
        />
        <div className="process-grid">
          {steps.map(([number, title, text]) => (
            <article className="process-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
