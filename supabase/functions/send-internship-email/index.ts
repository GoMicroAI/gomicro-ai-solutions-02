import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InternshipEmailRequest {
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  coverLetter: string;
  resumeUrl: string;
  resumeName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    if (!body) {
      console.error("Empty request body received");
      return new Response(JSON.stringify({ error: "Empty request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { name, email, phone, linkedin, coverLetter, resumeUrl, resumeName }: InternshipEmailRequest = JSON.parse(body);

    console.log("Sending internship application email for:", email);

    const emailResponse = await resend.emails.send({
      from: "GoMicro Careers <noreply@gomicro.ai>",
      to: ["sivam@gomicro.ai"],
      subject: `Internship Application from ${name}`,
      html: `
        <h2>New Internship Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>` : ''}
        <p><strong>Resume:</strong> ${resumeName}</p>
        <p><a href="${resumeUrl}">Download Resume</a></p>
        <h3>Cover Letter:</h3>
        <p>${coverLetter.replace(/\n/g, '<br>')}</p>
      `,
      reply_to: email,
    });

    console.log("Resend response:", JSON.stringify(emailResponse));

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
