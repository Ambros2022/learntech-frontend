import Link from 'next/link'
import { memo } from 'react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export const Breadcrumb = memo(({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="breadcrumb" className="bg-white py-2">
      <div className="container linkFontSize">
        <Link href="/" className="text-black text-decoration-none">
          Home
        </Link>
        

        {items.map((item, index) =>
          !item.href || index === items.length - 1 ? (
            <span key={index}>
              <i className="bi bi-chevron-right mx-2 text-black" style={{ fontSize: '0.85rem' }} />
              <span className="text-blue fw-medium">{item.label}</span>
            </span>
          ) : (
            <span key={index}>
              <i className="bi bi-chevron-right mx-2 text-black" style={{ fontSize: '0.85rem' }} />
              <Link href={item.href} className="text-black text-decoration-none">
                {item.label}
              </Link>
            </span>
          )
        )}
      </div>
    </nav>
  )
})

Breadcrumb.displayName = 'Breadcrumb'
