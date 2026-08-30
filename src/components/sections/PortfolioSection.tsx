import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { projects } from "@/data/projects";

export function PortfolioSection() {
  return (
    <section className="section" id="work">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Built to test, explain, and perform."
          text="Projects are stored as data, so adding a new case is as simple as adding one object to the project list."
        />

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-card__visual">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 800px) 100vw, 33vw"
                  className="project-card__image"
                />
                <span className="project-card__number">{project.accent}</span>
              </div>

              <div className="project-card__content">
                <p className="eyebrow">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <dl className="project-meta">
                  <div>
                    <dt>Material</dt>
                    <dd>{project.material}</dd>
                  </div>
                  <div>
                    <dt>Finish</dt>
                    <dd>{project.finish}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
