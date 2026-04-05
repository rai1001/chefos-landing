// src/lib/notifications.ts
// Función para disparar notificaciones asíncronas a Telegram
// Speed-to-lead notification webhook

export async function sendTelegramAlert(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Faltan credenciales de Telegram en variables de entorno. Alerta no enviada.");
    return false;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Error enviando Telegram alert:', err);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Exception enviando Telegram alert:', error);
    return false;
  }
}
