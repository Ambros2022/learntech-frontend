import FrontLayout from 'src/@core/layouts/FrontLayout'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <FrontLayout>{children}</FrontLayout>
}
