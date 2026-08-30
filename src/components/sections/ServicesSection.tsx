import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";

const services = [
  ["01", "Rapid prototypes", "Fast physical iterations for fit, form, assembly, and design decisions."],
  ["02", "Presentation models", "Clean models for reviews, pitches, exhibitions, and client presentations."],
  ["03", "Small-batch production", "Repeatable printed parts for limited runs, custom tools, and specialist use."],
  ["04", "Print preparation", "Model checking, orientation, supports, tolerances, and material recommendations."]
];

export function ServicesSection() {
  return (
    <section className="section section--soft" id="services">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="From CAD file to finished part."
        />

        <div className="service-list">
          {services.map(([number, title, text]) => (
            <article className="service-row" key={number}>
              <span className="service-row__number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
