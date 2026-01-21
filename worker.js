export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Tunachukua jina la file kutoka kwenye link (mfano: ?file=logos/picha.jpg)
    const key = url.searchParams.get('file') || url.pathname.slice(1);

    // Mipangilio ya CORS (Inaruhusu website yako kuongea na Worker bila kuzuiliwa)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 1. Shughulikia 'Pre-flight' requests za Browser
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 2. NJIA YA KUPAKIA PICHA (PUT)
    if (request.method === "PUT") {
      if (!key) return new Response("Jina la file linakosekana", { status: 400, headers: corsHeaders });
      
      try {
        await env.MY_BUCKET.put(key, request.body, {
          httpMetadata: { contentType: request.headers.get("Content-Type") || "image/jpeg" }
        });
        return new Response("Upload Success!", { headers: corsHeaders });
      } catch (e) {
        return new Response("Error: " + e.message, { status: 500, headers: corsHeaders });
      }
    }

    // 3. NJIA YA KUSOMA PICHA (GET) - Ili picha ionekane kwenye website
    if (request.method === "GET") {
      if (!key || key === "") return new Response("Worker is Active", { headers: corsHeaders });
      
      const object = await env.MY_BUCKET.get(key);
      if (!object) return new Response("Picha haipo", { status: 404, headers: corsHeaders });

      const headers = new Headers(corsHeaders);
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      headers.set("Access-Control-Allow-Origin", "*"); // Ruhusu picha ionekane kwenye website
      return new Response(object.body, { headers });
    }

    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }
};