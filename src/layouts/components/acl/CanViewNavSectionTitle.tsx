import { ReactNode } from 'react'
import type { NavSectionTitle } from 'src/@core/layouts/types'

// Pass-through — this site has no role-based nav gating
const CanViewNavSectionTitle = ({ children }: { navSectionTitle: NavSectionTitle; children: ReactNode }) => (
  <>{children}</>
)

export default CanViewNavSectionTitle
