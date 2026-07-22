'use client'

export default function NotAuthorized() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 700, margin: 0 }}>401</h1>
      <h2>Not Authorized</h2>
      <p>You don&apos;t have permission to access this page.</p>
    </div>
  )
}
