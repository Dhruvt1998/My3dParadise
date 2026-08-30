"use client";

import {
  FormEvent,
  useState
} from "react";

import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { siteConfig } from "@/config/site";

type FormStatus =
    | "idle"
    | "sending"
    | "success"
    | "error";

export function InquirySection() {
  const [status, setStatus] =
      useState<FormStatus>("idle");

  const [errorMessage, setErrorMessage] =
      useState("");

  async function handleSubmit(
      event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;

    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      projectType: String(
          formData.get("projectType") || ""
      ),
      budget: String(formData.get("budget") || ""),
      message: String(formData.get("message") || ""),

      // Honeypot field
      website: String(formData.get("website") || "")
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
            result.error || "Unable to send inquiry."
        );
      }

      form.reset();

      setStatus("success");
    } catch (error) {
      console.error(error);

      setStatus("error");

      setErrorMessage(
          error instanceof Error
              ? error.message
              : "Something went wrong. Please try again."
      );
    }
  }

  return (
      <section
          className="section section--dark"
          id="inquiry"
      >
        <Container>
          <div className="inquiry-grid">
            <div>
              <SectionHeading
                  eyebrow="Project inquiry"
                  title="Tell me what you want to make."
                  text="Send the project details and the inquiry will arrive directly in my inbox."
              />

              <a
                  className="direct-email"
                  href={`mailto:${siteConfig.contactEmail}`}
              >
                {siteConfig.contactEmail}
              </a>
            </div>

            <form
                className="inquiry-form"
                onSubmit={handleSubmit}
            >
              {/* Hidden honeypot for bots */}
              <div
                  className="form-honeypot"
                  aria-hidden="true"
              >
                <label>
                  Website
                  <input
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                  />
                </label>
              </div>

              <div className="field-grid">
                <label>
                  Name

                  <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      maxLength={100}
                      required
                  />
                </label>

                <label>
                  Email

                  <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      maxLength={200}
                      required
                  />
                </label>
              </div>

              <div className="field-grid">
                <label>
                  Project type

                  <select
                      name="projectType"
                      defaultValue=""
                      required
                  >
                    <option
                        value=""
                        disabled
                    >
                      Select one
                    </option>

                    <option>
                      Prototype
                    </option>

                    <option>
                      Presentation model
                    </option>

                    <option>
                      Small-batch production
                    </option>

                    <option>
                      Print preparation
                    </option>

                    <option>
                      Other
                    </option>
                  </select>
                </label>

                <label>
                  Approx. budget

                  <select
                      name="budget"
                      defaultValue=""
                  >
                    <option value="">
                      Not sure yet
                    </option>

                    <option>
                      Under €100
                    </option>

                    <option>
                      €100–€300
                    </option>

                    <option>
                      €300–€1,000
                    </option>

                    <option>
                      €1,000+
                    </option>
                  </select>
                </label>
              </div>

              <label>
                Project details

                <textarea
                    name="message"
                    rows={6}
                    maxLength={5000}
                    placeholder="What are you making? Add dimensions, material needs, quantity, deadline, or anything else useful."
                    required
                />
              </label>

              <button
                  className="submit-button"
                  type="submit"
                  disabled={status === "sending"}
              >
                {status === "sending"
                    ? "Sending..."
                    : "Send inquiry"}

                {status !== "sending" && (
                    <span aria-hidden="true">
                  ↗
                </span>
                )}
              </button>

              {status === "success" && (
                  <p
                      className="form-status form-status--success"
                      role="status"
                  >
                    Thanks. Your inquiry has been sent
                    successfully.
                  </p>
              )}

              {status === "error" && (
                  <p
                      className="form-status form-status--error"
                      role="alert"
                  >
                    {errorMessage}
                  </p>
              )}
            </form>
          </div>
        </Container>
      </section>
  );
}