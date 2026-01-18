export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Tunachukua jina la file kutoka kwenye url (mfano: ?file=logos/picha.jpg)
    const key = url.searchParams.get('file');

    // Mipangilio ya CORS - Hii ni LAZIMA ili website yako ifanye kazi
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // Ruhusu kila mtu (unaweza kubadilisha iwe domain yako baadaye)
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 1. Shughulikia 'Pre-flight' requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 2. NJIA YA KUPAKIA PICHA (PUT)
    if (request.method === "PUT") {
      if (!key) return new Response("Jina la file linakosekana", { status: 400, headers: corsHeaders });
      
      await env.MY_BUCKET.put(key, request.body, {
        httpMetadata: { contentType: request.headers.get("Content-Type") || "image/jpeg" }
      });
      return new Response(`Picha ${key} imehifadhiwa!`, { headers: corsHeaders });
    }

    // 3. NJIA YA KUSOMA PICHA (GET) - Ili picha ionekane kwenye dashboard
    if (request.method === "GET") {
      if (!key) return new Response("Karibu Pixiest Storage", { headers: corsHeaders });
      
      const object = await env.MY_BUCKET.get(key);
      if (!object) return new Response("Picha haijapatikana", { status: 404, headers: corsHeaders });

      const headers = new Headers(corsHeaders);
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      return new Response(object.body, { headers });
    }

    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }
};