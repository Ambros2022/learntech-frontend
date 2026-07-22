'use client'

import { z } from 'zod'

const PHONE_RULES: [RegExp, RegExp][] = [
  [/^\+91-/, /^\+91-\d{10}$/],
  [/^\+966-/, /^\+966-\d{9}$/],
  [/^\+971-/, /^\+971-\d{9}$/],
  [/^\+974-/, /^\+974-\d{8}$/],
  [/^\+968-/, /^\+968-\d{8}$/],
  [/^\+965-/, /^\+965-\d{8}$/],
  [/^\+973-/, /^\+973-\d{8}$/],
  [/^\+977-/, /^\+977-\d{10}$/],
]

const isValidPhone = (val: string) => {
  const rule = PHONE_RULES.find(([prefix]) => prefix.test(val))
  return rule ? rule[1].test(val) : false
}

export const phoneSchema = z.string().refine(isValidPhone, 'Enter a valid phone number')

const API = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

export async function submitEnquiry(fields: Record<string, string>): Promise<boolean> {
  const body = new FormData()
  Object.entries(fields).forEach(([k, v]) => body.append(k, v))
  body.append('current_url', window.location.href)
  const res = await fetch(`${API}/api/website/enquiry`, { method: 'POST', body })
  return res.ok
}
