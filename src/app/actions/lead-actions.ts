'use server'

import { createClient } from '@/lib/supabase/server'
import { sendTelegramAlert } from '@/lib/notifications'

export async function savePartialLead(restaurantName: string): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('businesses')
      .insert([{ name: restaurantName, source: 'inbound' }])
      .select('id')
      .single()

    if (error) {
      console.error('Insert error (partial):', error)
      return { success: true, leadId: undefined }
    }

    return { success: true, leadId: data.id }
  } catch (err: any) {
    console.error('Error saving partial lead:', err)
    return { success: true, leadId: undefined }
  }
}

export async function completeLeadCapture(leadId: string | null | undefined, restaurantName: string, payload: { email: string; phone?: string }): Promise<{ success: boolean; error?: string }> {
  // SIEMPRE enviar Telegram, independientemente de Supabase
  sendTelegramAlert(
    `🚀 <b>Nuevo Prospecto RestoOs</b>\n\n🍽️ Restaurante: ${restaurantName}\n✉️ Email: ${payload.email}\n📞 Teléfono: ${payload.phone || 'No provisto'}`
  )

  try {
    const supabase = await createClient()

    let finalLeadId = leadId
    if (!finalLeadId) {
      const { data, error: insertError } = await supabase
        .from('businesses')
        .insert([{
          name: restaurantName,
          email: payload.email,
          phone: payload.phone,
          source: 'inbound'
        }])
        .select('id')
        .single()

      if (insertError) {
        console.error('Insert error (complete):', insertError)
      } else {
        finalLeadId = data.id
      }
    } else {
      const { error: updateError } = await supabase
        .from('businesses')
        .update({ email: payload.email, phone: payload.phone })
        .match({ id: finalLeadId })

      if (updateError) console.error('Update error:', updateError)
    }

    return { success: true }
  } catch (err: any) {
    console.error('Error completing lead capture:', err)
    return { success: true } // Always succeed for the user
  }
}
