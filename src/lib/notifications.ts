// src/lib/notifications.ts
// Notificaciones de leads: Telegram + Email

export async function sendTelegramAlert(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Faltan credenciales de Telegram. Alerta no enviada.");
    return false;
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    if (!res.ok) {
      console.error("Error Telegram:", await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Exception Telegram:", error);
    return false;
  }
}

export async function sendEmailAlert(lead: {
  restaurantName: string;
  email: string;
  phone?: string;
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!notifyEmail) {
    console.warn("NOTIFY_EMAIL no configurado.");
    return false;
  }

  // Usamos la API de Supabase Edge Function o un webhook de Make.com
  // Por simplicidad, enviamos vía Make.com webhook si está configurado
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: notifyEmail,
          subject: `Nuevo Lead RestoOs: ${lead.restaurantName}`,
          restaurantName: lead.restaurantName,
          email: lead.email,
          phone: lead.phone || "No provisto",
          timestamp: new Date().toISOString(),
        }),
      });
      return res.ok;
    } catch (error) {
      console.error("Exception email webhook:", error);
      return false;
    }
  }

  return false;
}
