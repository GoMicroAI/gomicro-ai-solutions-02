import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DemoEmailRequest {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  role?: string;
  industry?: string;
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

    const { firstName, lastName, workEmail, company, role, industry }: DemoEmailRequest = JSON.parse(body);

    console.log("Sending demo registration email for:", workEmail);

    const emailResponse = await resend.emails.send({
      from: "GoMicro Demo Waitlist <noreply@gomicro.ai>",
      to: ["sivam@gomicro.ai", "kristie@gomicro.ai"],
      subject: `Demo Waitlist Registration: ${firstName} ${lastName} - ${company}`,
      html: `
        <h2>New Demo Waitlist Registration</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Work Email:</strong> ${workEmail}</p>
        <p><strong>Company / Organisation:</strong> ${company}</p>
        <p><strong>Role:</strong> ${role || "Not specified"}</p>
        <p><strong>Industry:</strong> ${industry || "Not specified"}</p>
        <hr />
        <p><em>This registration was submitted via the GoMicro AI Demo Waitlist form.</em></p>
      `,
      reply_to: workEmail,
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
    console.error("Error sending demo email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
