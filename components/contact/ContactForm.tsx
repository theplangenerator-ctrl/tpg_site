'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2 } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  gym: z.string().min(2, 'Gym or company name is required'),
  members: z.enum(['under-100', '100-500', '500-1000', '1000+'], {
    errorMap: () => ({ message: 'Please select a membership size' }),
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

const inputClass =
  'w-full bg-gray-card border border-gray-border text-white font-inter text-sm px-4 py-3 outline-none transition-all duration-200 placeholder:text-gray-muted focus:border-red focus:ring-0'

const errorClass = 'font-inter text-red text-xs mt-1.5'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6 py-20 text-center"
          >
            <CheckCircle size={48} className="text-red" strokeWidth={1.5} />
            <div>
              <h3 className="font-barlow font-[700] text-2xl text-white uppercase tracking-tight mb-2">
                Message Received
              </h3>
              <p className="font-inter text-gray-muted text-sm max-w-[40ch]">
                We'll be in touch within 24 hours.
              </p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="font-space text-xs text-gray-muted uppercase tracking-label hover:text-white transition-colors duration-200 underline underline-offset-4"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="font-space text-xs text-white uppercase tracking-label font-semibold block mb-2">
                Full Name <span className="text-red">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                className={inputClass}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                {...register('name')}
                disabled={status === 'submitting'}
              />
              {errors.name && (
                <motion.p
                  id="name-error"
                  role="alert"
                  className={errorClass}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="font-space text-xs text-white uppercase tracking-label font-semibold block mb-2">
                  Email Address <span className="text-red">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@yourco.com"
                  className={inputClass}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                  disabled={status === 'submitting'}
                />
                {errors.email && (
                  <motion.p
                    id="email-error"
                    role="alert"
                    className={errorClass}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="font-space text-xs text-white uppercase tracking-label font-semibold block mb-2">
                  Phone <span className="text-gray-muted font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (312) 000-0000"
                  className={inputClass}
                  {...register('phone')}
                  disabled={status === 'submitting'}
                />
              </div>
            </div>

            {/* Gym name */}
            <div>
              <label htmlFor="gym" className="font-space text-xs text-white uppercase tracking-label font-semibold block mb-2">
                Gym / Company Name <span className="text-red">*</span>
              </label>
              <input
                id="gym"
                type="text"
                placeholder="Iron Peak Fitness"
                className={inputClass}
                aria-invalid={!!errors.gym}
                aria-describedby={errors.gym ? 'gym-error' : undefined}
                {...register('gym')}
                disabled={status === 'submitting'}
              />
              {errors.gym && (
                <motion.p
                  id="gym-error"
                  role="alert"
                  className={errorClass}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.gym.message}
                </motion.p>
              )}
            </div>

            {/* Number of members */}
            <div>
              <label htmlFor="members" className="font-space text-xs text-white uppercase tracking-label font-semibold block mb-2">
                Number of Members <span className="text-red">*</span>
              </label>
              <select
                id="members"
                className={`${inputClass} appearance-none cursor-pointer`}
                aria-invalid={!!errors.members}
                aria-describedby={errors.members ? 'members-error' : undefined}
                {...register('members')}
                disabled={status === 'submitting'}
              >
                <option value="" disabled>Select membership size</option>
                <option value="under-100">Under 100</option>
                <option value="100-500">100 – 500</option>
                <option value="500-1000">500 – 1,000</option>
                <option value="1000+">1,000+</option>
              </select>
              {errors.members && (
                <motion.p
                  id="members-error"
                  role="alert"
                  className={errorClass}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.members.message}
                </motion.p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="font-space text-xs text-white uppercase tracking-label font-semibold block mb-2">
                Message <span className="text-red">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us about your gym and what you're looking to achieve with the kiosk..."
                className={inputClass}
                style={{ resize: 'vertical' }}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                {...register('message')}
                disabled={status === 'submitting'}
              />
              {errors.message && (
                <motion.p
                  id="message-error"
                  role="alert"
                  className={errorClass}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.message.message}
                </motion.p>
              )}
            </div>

            {/* API error */}
            {status === 'error' && (
              <p className="font-inter text-red text-sm" role="alert">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-red hover:bg-red-hover disabled:opacity-60 disabled:cursor-not-allowed font-space font-semibold text-sm text-white uppercase tracking-label transition-colors duration-200"
              style={{ minHeight: '56px' }}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
