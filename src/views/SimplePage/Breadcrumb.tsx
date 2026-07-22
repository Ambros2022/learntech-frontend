import { Breadcrumb } from 'src/app/components/Breadcrumb'

export default function Breadcrumbs({ link }: { link: string }) {
  return <Breadcrumb items={[{ label: link }]} />
}
