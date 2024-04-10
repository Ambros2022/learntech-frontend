// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from 'src/hooks/useAuth'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/app/dashboard',
      icon: 'tabler:smart-home',
      action: 'manage',
      subject: 'dashboard',
      auth: false
    },
    {
      title: 'Locations',
      icon: 'tabler:location',
      auth: false,
      children: [
        {
          title: 'Countries',
          path: '/app/dashboard/locations/countries',
          auth: false
        },
        {
          title: 'States',
          path: '/app/dashboard/locations/states',
          auth: false
        },
        {
          title: 'Cities',
          path: '/app/dashboard/locations/cities',
          auth: false
        }
      ]
    },
    {
      title: 'Amenities',
      path: '/app/dashboard/amenity',
      icon: 'tabler:mail',
      auth: false
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'tabler:mail',
      auth: false
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield'
    }
  ]
}

export default navigation
