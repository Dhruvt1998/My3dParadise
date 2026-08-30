import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="hero" id="top">
      <Container>
        <div className="hero__grid">
          <div>
            <p className="eyebrow">3D Printing Portfolio</p>
            <h1>
              Ideas made
              <br />
              physical.
            </h1>
          </div>

          <div className="hero__side">
            <p>{siteConfig.description}</p>
            <div className="hero__actions">
              <Button href="#work">View selected work</Button>
              <Button href="#inquiry" variant="secondary">
                Start a project
              </Button>
            </div>
          </div>
        </div>

        <div className="hero-object" aria-label="Abstract 3D printed form">
          <div className="hero-object__layer hero-object__layer--1" />
          <div className="hero-object__layer hero-object__layer--2" />
          <div className="hero-object__layer hero-object__layer--3" />
          <div className="hero-object__center">
            <span>FDM</span>
            <strong>0.20</strong>
            <small>layer height / mm</small>
          </div>
        </div>
      </Container>
    </section>
  );
}
