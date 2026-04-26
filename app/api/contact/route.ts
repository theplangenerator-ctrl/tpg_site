import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  gym: z.string().min(2),
  members: z.enum(['under-100', '100-500', '500-1000', '1000+']),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    console.log('[TPG Contact Submission]', {
      timestamp: new Date().toISOString(),
      ...data,
    })

    // Ready for Resend / SendGrid integration:
    // await sendEmail({ to: 'hello@tpgfitness.com', ...data })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', issues: error.issues },
        { status: 400 }
      )
    }
    console.error('[TPG Contact Error]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
