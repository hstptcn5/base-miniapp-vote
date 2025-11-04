import { NextResponse } from 'next/server'

// Webhook endpoint for Mini App events
// This will be called by Base App for various events like notifications, etc.
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Handle webhook events here
    // Example: notifications, user actions, etc.
    console.log('Webhook received:', body)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}


