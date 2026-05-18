'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, Loader2 } from 'lucide-react'

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
  'w-full bg-paper border border-ash text-graphite-500 font-body text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-steel focus:border-signal focus:ring-0'

const errorClass = 'font-body text-signal text-xs mt-1.5'

const labelClass =
  'font-mono text-[0.6875rem] text-graphite-300 uppercase tracking-[0.18em] font-medium block mb-2'

export default function ContactFormLight({ defaultMessage = '' }: { defaultMessage?: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { message: defaultMessage },
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
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6 py-20 text-center"
          >
            <CheckCircle size={48} className="text-signal" strokeWidth={1.5} />
            <div>
              <h3 className="font-display text-2xl text-graphite-500 mb-2">
                Message Received
              </h3>
              <p className="font-body text-graphite-100 text-sm max-w-[40ch]">
                We&apos;ll be in touch within 24 hours.
              </p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="font-mono text-[0.6875rem] text-graphite-100 uppercase tracking-[0.18em] hover:text-signal transition-colors duration-200 underline underline-offset-4"
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
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name <span className="text-signal">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                autoComplete="name"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address <span className="text-signal">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@yourco.com"
                  autoComplete="email"
                  inputMode="email"
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
                <label htmlFor="phone" className={labelClass}>
                  Phone{' '}
                  <span className="text-steel font-normal normal-case tracking-normal">
                    (optional)
                  </span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 00000 00000"
                  autoComplete="tel"
                  inputMode="tel"
                  className={inputClass}
                  {...register('phone')}
                  disabled={status === 'submitting'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="gym" className={labelClass}>
                Gym / Company Name <span className="text-signal">*</span>
              </label>
              <input
                id="gym"
                type="text"
                placeholder="Iron Peak Fitness"
                autoComplete="organization"
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

            <div>
              <label htmlFor="members" className={labelClass}>
                Number of Members <span className="text-signal">*</span>
              </label>
              <div className="relative">
                <select
                  id="members"
                  className={`${inputClass} appearance-none cursor-pointer pr-10`}
                  aria-invalid={!!errors.members}
                  aria-describedby={errors.members ? 'members-error' : undefined}
                  {...register('members')}
                  disabled={status === 'submitting'}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select membership size
                  </option>
                  <option value="under-100">Under 100</option>
                  <option value="100-500">100 – 500</option>
                  <option value="500-1000">500 – 1,000</option>
                  <option value="1000+">1,000+</option>
                </select>
                <ChevronDown
                  size={16}
                  strokeWidth={1.75}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-graphite-100"
                  aria-hidden="true"
                />
              </div>
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

            <div>
              <label htmlFor="message" className={labelClass}>
                Message <span className="text-signal">*</span>
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

            {status === 'error' && (
              <p className="font-body text-signal text-sm" role="alert">
                Something went wrong. Please try again or email us directly at{' '}
                <a href="mailto:contact@tpgfitness.com" className="underline underline-offset-2">
                  contact@tpgfitness.com
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-signal hover:bg-signal-hot disabled:opacity-60 disabled:cursor-not-allowed font-mono font-medium text-[0.75rem] text-paper uppercase tracking-[0.22em] transition-[background-color,transform] duration-200 ease-out active:scale-[0.985] motion-reduce:active:scale-100"
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
