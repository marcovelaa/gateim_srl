function sanitize(str, maxLength = 2000) {
  if (typeof str !== 'string') return '';
  const trimmed = str.trim().slice(0, maxLength);
  return trimmed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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

    // Sanitize and bound input lengths
    const nombre = sanitize(data.nombre, 100);
    const empresa = sanitize(data.empresa, 100);
    const telefono = sanitize(data.telefono, 50);
    const correo = sanitize(data.correo, 100);
    const mensaje = sanitize(data.mensaje, 2000);
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return new Response(JSON.stringify({ error: 'Correo electrónico inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Prepare email data for Resend API
    const emailData = {
      from: 'Web GATEIM <no-reply@gateim.com.bo>',
      to: ['ventas@gateim.com.bo'],
      subject: `Nueva consulta de ${nombre} - Sitio Web`,
      html: `
        <h2>Nueva consulta desde el sitio web</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'No especificado'}</p>
        <p><strong>Correo Electrónico:</strong> ${correo}</p>
        <br/>
        <h3>Mensaje:</h3>
        <p>${mensaje.replace(/\n/g, '<br/>')}</p>
      `
    };

    const RESEND_API_KEY = context.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.log('Email would be sent:', emailData);
      return new Response(JSON.stringify({ success: true, warning: 'RESEND_API_KEY no configurada' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
