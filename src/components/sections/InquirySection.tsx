"use client";

import { FormEvent } from "react";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { siteConfig } from "@/config/site";

export function InquirySection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const projectType = String(form.get("projectType") || "");
    const budget = String(form.get("budget") || "");
    const message = String(form.get("message") || "");

    const subject = encodeURIComponent(`3D printing inquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${projectType}`,
        `Budget: ${budget}`,
        "",
        "Project details:",
        message
      ].join("\n")
    );

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="section section--dark" id="inquiry">
      <Container>
        <div className="inquiry-grid">
          <div>
            <SectionHeading
              eyebrow="Project inquiry"
              title="Tell me what you want to make."
              text="Submit the form and your email app will open with the project details already prepared."
            />
            <a className="direct-email" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </div>

          <form className="inquiry-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label>
                Name
                <input name="name" type="text" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="you@example.com" required />
              </label>
            </div>

            <div className="field-grid">
              <label>
                Project type
                <select name="projectType" defaultValue="" required>
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Prototype</option>
                  <option>Presentation model</option>
                  <option>Small-batch production</option>
                  <option>Print preparation</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Approx. budget
                <select name="budget" defaultValue="">
                  <option value="">Not sure yet</option>
                  <option>Under €100</option>
                  <option>€100–€300</option>
                  <option>€300–€1,000</option>
                  <option>€1,000+</option>
                </select>
              </label>
            </div>

            <label>
              Project details
              <textarea
                name="message"
                rows={6}
                placeholder="What are you making? Add dimensions, material needs, quantity, deadline, or anything else useful."
                required
              />
            </label>

            <button className="submit-button" type="submit">
              Prepare email <span aria-hidden="true">↗</span>
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
