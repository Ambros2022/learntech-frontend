import { ReactNode } from 'react'
import type { NavLink } from 'src/@core/layouts/types'

// Pass-through — this site has no role-based nav gating
const CanViewNavLink = ({ children }: { navLink: NavLink; children: ReactNode }) => (
  <>{children}</>
)

export default CanViewNavLink
