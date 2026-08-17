'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';
import { Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background Glowing Orbs matching Hero */}
      <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-tertiary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-tertiary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-surface-container/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 relative z-10"
      >
        <div className="pt-10 pb-6 px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-tertiary/10 text-tertiary mb-6 shadow-[0_0_30px_rgba(56,189,248,0.2)]">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-display-sm font-black tracking-tighter uppercase text-on-background">Admin Access</h1>
          <p className="text-on-surface-variant text-label-md uppercase tracking-widest mt-2">Auliacorp CMS</p>
        </div>
        
        <div className="p-8 pt-2">
          <form action={formAction} className="flex flex-col gap-5">
            {state?.error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded bg-error/10 text-error text-label-md font-bold border border-error/20 text-center"
              >
                {state.error}
              </motion.div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                name="email" 
                required 
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline/30 rounded text-on-background focus:ring-2 focus:ring-tertiary focus:border-tertiary transition-all outline-none"
                placeholder="admin@auliacorp.com"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                name="password" 
                required 
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline/30 rounded text-on-background focus:ring-2 focus:ring-tertiary focus:border-tertiary transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isPending}
              className="mt-4 w-full py-4 px-4 bg-tertiary text-on-tertiary rounded font-label-md font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] flex items-center justify-center gap-2 group"
            >
              {isPending ? 'Authenticating...' : 'Sign In'}
              {!isPending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
