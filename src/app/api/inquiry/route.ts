import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type InquiryBody = {
    name?: string;
    email?: string;
    projectType?: string;
    budget?: string;
    message?: string;
    website?: string;
};

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as InquiryBody;

        const name = body.name?.trim() ?? "";
        const email = body.email?.trim() ?? "";
        const projectType = body.projectType?.trim() ?? "";
        const budget = body.budget?.trim() ?? "";
        const message = body.message?.trim() ?? "";

        // Honeypot field for simple bot protection.
        if (body.website) {
            return NextResponse.json({ success: true });
        }

        if (!name || !email || !projectType || !message) {
            return NextResponse.json(
                { error: "Please complete all required fields." },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        if (
            name.length > 100 ||
            email.length > 200 ||
            projectType.length > 100 ||
            budget.length > 100 ||
            message.length > 5000
        ) {
            return NextResponse.json(
                { error: "One or more fields are too long." },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;
        const contactEmail = process.env.CONTACT_EMAIL;
        const fromEmail =
            process.env.FROM_EMAIL?.trim() ||
            "onboarding@resend.dev";

        if (!apiKey || !contactEmail) {
            console.error(
                "Missing RESEND_API_KEY or CONTACT_EMAIL environment variable."
            );

            return NextResponse.json(
                { error: "Email service is not configured." },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeProjectType = escapeHtml(projectType);
        const safeBudget = escapeHtml(budget || "Not specified");
        const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

        const { error } = await resend.emails.send({
            from: fromEmail,
            to: [contactEmail],
            replyTo: email,
            subject: `3D printing inquiry from ${name}`,
            html: `
        <div style="
          font-family: Arial, Helvetica, sans-serif;
          max-width: 680px;
          margin: 0 auto;
          color: #111111;
          line-height: 1.6;
        ">
          <div style="
            border-bottom: 1px solid #dddddd;
            padding-bottom: 24px;
            margin-bottom: 30px;
          ">
            <p style="
              margin: 0 0 8px;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.12em;
              color: #777777;
            ">
              My3dParadise
            </p>

            <h1 style="
              margin: 0;
              font-size: 30px;
              letter-spacing: -0.04em;
            ">
              New project inquiry
            </h1>
          </div>

          <table style="
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          ">
            <tr>
              <td style="padding: 10px 0; color: #777777;">
                Name
              </td>

              <td style="padding: 10px 0;">
                ${safeName}
              </td>
            </tr>

            <tr>
              <td style="padding: 10px 0; color: #777777;">
                Email
              </td>

              <td style="padding: 10px 0;">
                ${safeEmail}
              </td>
            </tr>

            <tr>
              <td style="padding: 10px 0; color: #777777;">
                Project type
              </td>

              <td style="padding: 10px 0;">
                ${safeProjectType}
              </td>
            </tr>

            <tr>
              <td style="padding: 10px 0; color: #777777;">
                Budget
              </td>

              <td style="padding: 10px 0;">
                ${safeBudget}
              </td>
            </tr>
          </table>

          <div style="
            background: #f5f5f2;
            padding: 24px;
            border-radius: 12px;
          ">
            <p style="
              margin: 0 0 10px;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: #777777;
            ">
              Project details
            </p>

            <p style="margin: 0;">
              ${safeMessage}
            </p>
          </div>

          <p style="
            margin-top: 30px;
            color: #777777;
            font-size: 13px;
          ">
            Reply directly to this email to respond to ${safeName}.
          </p>
        </div>
      `
        });

        if (error) {
            console.error("Resend error:", error);

            return NextResponse.json(
                { error: "Unable to send inquiry." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true
        });
    } catch (error) {
        console.error("Inquiry API error:", error);

        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}