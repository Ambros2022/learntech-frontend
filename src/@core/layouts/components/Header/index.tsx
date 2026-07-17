import TopBar from './TopBar'
import NavClient from './NavClient'
import type { HeaderProps } from './NavClient'

export default function Header(props: HeaderProps) {
  return (
    <>
      <TopBar />
      <NavClient {...props} />
    </>
  )
}
