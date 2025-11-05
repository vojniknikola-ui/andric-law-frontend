'use client'

import { ClientLayout } from './ClientLayout'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>
}
