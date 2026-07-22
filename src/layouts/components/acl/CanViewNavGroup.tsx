import { ReactNode } from 'react'
import type { NavGroup } from 'src/@core/layouts/types'

// Pass-through — this site has no role-based nav gating
const CanViewNavGroup = ({ children }: { navGroup: NavGroup; children: ReactNode }) => (
  <>{children}</>
)

export default CanViewNavGroup
