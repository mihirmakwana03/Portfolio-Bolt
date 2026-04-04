import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { name, email, subject, message }: ContactFormData = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name must be between 2 and 100 characters" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (subject.length < 5 || subject.length > 200) {
      return new Response(
        JSON.stringify({ error: "Subject must be between 5 and 200 characters" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Message must be between 10 and 5000 characters" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const checkQuery = await supabase
      .from("contact_messages")
      .select("created_at")
      .eq("email", email)
      .gte("created_at", new Date(Date.now() - 60 * 60 * 1000).toISOString())
      .maybeSingle();

    if (checkQuery.data) {
      return new Response(
        JSON.stringify({
          error: "You have already submitted a message recently. Please wait before submitting again.",
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          subject,
          message,
          ip_address: clientIp,
          user_agent: userAgent,
          status: "new",
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save message. Please try again later." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    try {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");

      if (resendApiKey) {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["mihirpmakwana786@gmail.com"],
            subject: `New Contact Form Submission: ${subject}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #6366F1 0%, #22C55E 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                    .field { margin-bottom: 20px; }
                    .label { font-weight: bold; color: #6366F1; margin-bottom: 5px; }
                    .value { background: white; padding: 12px; border-radius: 4px; border: 1px solid #e5e7eb; }
                    .message-box { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #6366F1; }
                    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
                    .metadata { font-size: 12px; color: #9ca3af; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <h1 style="margin: 0;">New Contact Form Submission</h1>
                      <p style="margin: 5px 0 0 0; opacity: 0.9;">Someone reached out through your portfolio</p>
                    </div>
                    <div class="content">
                      <div class="field">
                        <div class="label">From:</div>
                        <div class="value">${name}</div>
                      </div>

                      <div class="field">
                        <div class="label">Email:</div>
                        <div class="value"><a href="mailto:${email}" style="color: #6366F1; text-decoration: none;">${email}</a></div>
                      </div>

                      <div class="field">
                        <div class="label">Subject:</div>
                        <div class="value">${subject}</div>
                      </div>

                      <div class="field">
                        <div class="label">Message:</div>
                        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                      </div>

                      <div class="metadata">
                        <strong>Submission Details:</strong><br>
                        Message ID: ${data.id}<br>
                        Submitted: ${new Date(data.created_at).toLocaleString()}<br>
                        IP Address: ${clientIp}<br>
                        User Agent: ${userAgent}
                      </div>
                    </div>
                    <div class="footer">
                      <p>This message was sent from your portfolio contact form.</p>
                      <p>Reply directly to <a href="mailto:${email}" style="color: #6366F1;">${email}</a> to respond.</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
            text: `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Submission Details:
Message ID: ${data.id}
Submitted: ${new Date(data.created_at).toLocaleString()}
IP Address: ${clientIp}

Reply to: ${email}
            `,
          }),
        });

        if (!emailResponse.ok) {
          console.error("Failed to send email notification:", await emailResponse.text());
        } else {
          console.log("Email notification sent successfully");
        }
      } else {
        console.log("RESEND_API_KEY not configured, skipping email notification");
      }
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
        data: { id: data.id, created_at: data.created_at },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again later." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
