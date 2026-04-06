'use server'

import { createClient } from '@/lib/supabase/server'
import { sendTelegramAlert, sendEmailAlert } from '@/lib/notifications'

export async function savePartialLead(restaurantName: string): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
    const supabase = await createClient()
    
    // Using businesses table to register inbound interest
    const { data, error } = await supabase
      .from('businesses')
      .insert([
        { 
          name: restaurantName,
          source: 'inbound', 
        }
      ])
      .select('id')
      .single()

    if (error) {
    	console.error('Insert error (partial):', error);
    	return { success: true, leadId: undefined }; // Fallback to avoid breaking frontend
    }
    
    return { success: true, leadId: data.id }
  } catch (err: any) {
    console.error('Error saving partial lead:', err)
    return { success: false, error: err.message }
  }
}

export async function completeLeadCapture(leadId: string | null | undefined, restaurantName: string, payload: { email: string; phone?: string }): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    
    // If no leadId was captured initially, insert now
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
        
       if (insertError) throw insertError
       finalLeadId = data.id
    } else {
       // Update existing partial
       const { error: updateError } = await supabase
        .from('businesses')
        .update({ 
        	email: payload.email, 
        	phone: payload.phone 
        })
        .match({ id: finalLeadId })
        
       if (updateError) throw updateError
    }

    // Fire alerts (asynchronous, do not await to avoid blocking)
    sendTelegramAlert(`🚀 <b>Nuevo Prospecto B2B Capturado (RestoOs Landing)</b>\n\n🍽️ Restaurante: ${restaurantName}\n✉️ Email: ${payload.email}\n📞 Teléfono: ${payload.phone || 'No provisto'}`)
    sendEmailAlert({ restaurantName, email: payload.email, phone: payload.phone })

    return { success: true }
  } catch (err: any) {
    console.error('Error completing lead capture:', err)
    return { success: false, error: err.message }
  }
}
