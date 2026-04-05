'use client';

import { useState } from 'react';
import { savePartialLead, completeLeadCapture } from '@/app/actions/lead-actions';
import { Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function LeadCaptureMultiStep() {
  const [step, setStep] = useState(1);
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [leadId, setLeadId] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantName.trim()) return;

    setIsSubmitting(true);
    // Silent partial save
    const { success, leadId: newLeadId } = await savePartialLead(restaurantName);
    if (success && newLeadId) {
      setLeadId(newLeadId);
    }
    
    setIsSubmitting(false);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !restaurantName.trim()) return;

    setIsSubmitting(true);
    
    const { success } = await completeLeadCapture(leadId, restaurantName, { email, phone });
    
    setIsSubmitting(false);
    if (success) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 text-center max-w-md w-full mx-auto"
      >
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">¡Solicitud recibida!</h3>
        <p className="text-gray-400">Hemos enviado información para activar y probar a CLARA en tu correo electrónico. Te contactaremos pronto.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 max-w-md w-full mx-auto relative overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleNextStep}
            className="flex flex-col gap-6"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Prueba CLARA gratis</h3>
              <p className="text-gray-400 text-sm">Descubre cómo la IA atiende las reservas por ti.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="restaurant" className="block text-sm font-medium text-gray-300 mb-2">
                  ¿Cómo se llama tu restaurante?
                </label>
                <input
                  id="restaurant"
                  type="text"
                  required
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder="Ej. Pizzería Di Napoli"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !restaurantName.trim()}
              className="group w-full py-4 px-6 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Siguiente paso
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Casi terminamos</h3>
              <p className="text-gray-400 text-sm">¿A dónde enviamos el acceso para <b>{restaurantName}</b>?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email profesional
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gerencia@restaurante.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono de WhatsApp (Opcional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+34 600 000 000"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="group w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Finalizar y Acceder'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
