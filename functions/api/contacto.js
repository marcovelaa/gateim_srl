export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    
    // Server-side validation
    if (!data.nombre || !data.correo || !data.mensaje) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check for honeypot (just in case it was bypassed on client)
    if (data['bot-field']) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Prepare email data for Resend API
    const emailData = {
      from: 'Web GATEIM <no-reply@gateim.com.bo>', // Needs verified domain in Resend
      to: ['ventas@gateim.com.bo'], // [PENDIENTE: confirmar correo real]
      subject: `Nueva consulta de ${data.nombre} - Sitio Web`,
      html: `
        <h2>Nueva consulta desde el sitio web</h2>
        <p><strong>Nombre:</strong> ${data.nombre}</p>
        <p><strong>Empresa:</strong> ${data.empresa || 'No especificada'}</p>
        <p><strong>Teléfono:</strong> ${data.telefono || 'No especificado'}</p>
        <p><strong>Correo Electrónico:</strong> ${data.correo}</p>
        <br/>
        <h3>Mensaje:</h3>
        <p>${data.mensaje.replace(/\n/g, '<br/>')}</p>
      `
    };

    // Note: The RESEND_API_KEY must be configured in Cloudflare Pages dashboard
    const RESEND_API_KEY = context.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      // For local development or if key is missing, just log and return success
      console.log('Email would be sent:', emailData);
      return new Response(JSON.stringify({ success: true, warning: 'RESEND_API_KEY not configured' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Call Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const errorText = await response.text();
      console.error('Resend API error:', errorText);
      return new Response(JSON.stringify({ error: 'Error al enviar el correo' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: 'Error de servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
