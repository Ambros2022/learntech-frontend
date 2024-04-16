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
      title: 'School',
      icon: 'tabler:school',
      auth: false,
      children: [
        {
          title: 'School Board',
          path: '/app/dashboard/schoolboard',
          auth: false
        },
        {
          title: 'Schools',
          path: '/app/dashboard/schools',
          // icon: 'tabler:mail',
          auth: false
        }
      ]
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
      path: '/app/dashboard/amenities',
      icon: 'tabler:user',
      auth: false
    },

    {
      title: 'Recognition',
      path: '/app/dashboard/recognition',
      icon: 'tabler:text-recognition',
      auth: false
    },
    {
      title: 'Pages',
      path: '/app/dashboard/Pagess',
      icon: 'tabler:book',
      auth: false
    },
    {
      title: 'Banner',
      path: '/app/dashboard/banner',
      icon: 'tabler:frame',
      auth: false
    },
    {
      title: 'Stream',
      path: '/app/dashboard/stream',
      icon: 'tabler:baseline-density-small',
      auth: false
    },

    // {
    //   title: 'School',
    //   icon: 'tabler:school',
    //   auth: false,
    //   children: [
    //     {
    //       title: 'School Board',
    //       path: '/app/dashboard/schoolboard',
    //       auth: false
    //     },
    //     {
    //       title: 'Schools',
    //       path: '/app/dashboard/schools',
    //       // icon: 'tabler:mail',
    //       auth: false
    //     }
    //   ]
    // },

    // {
    //   title: 'School Board',
    //   path: '/app/dashboard/schoolboard',
    //   icon: 'tabler:school',
    //   auth: false
    // },

    // {
    //   title: 'Second Page',
    //   path: '/second-page',
    //   icon: 'tabler:mail',
    //   auth: false
    // },
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
