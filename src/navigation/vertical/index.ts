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
      icon: 'tabler:building',
      auth: false,
      children: [
        {
          title: 'Schools',
          path: '/app/dashboard/schools',
          // icon: 'tabler:mail',
          auth: false
        },
        {
          title: 'School Board',
          path: '/app/dashboard/schoolboard',
          auth: false
        },
        
      ]
    },

    {
      title: 'University/Colleges',
      icon: 'tabler:school',
      auth: false,
      children: [
        {
          title: 'College',
          path: '/app/dashboard/college',
          // icon: 'tabler:mail',
          auth: false
        },
       
        
      ]
    },

    {
      title: 'General Course',
      path: '/app/dashboard/generalcourse',
      icon: 'tabler:book-filled',
      auth: false
    },

    {
      title: 'Course',
      path: '/app/dashboard/course',
      icon: 'tabler:notes',
      auth: false
    },


    {
      title: 'Landing Page',
      path: '/app/dashboard/landingpage ',
      icon: 'tabler:notes',
      auth: false
    },

    {
      title: 'News',
      icon: 'tabler:news',
      auth: false,
      children: [
        {
          title: 'News Categories',
          path: '/app/dashboard/newscategories',
          auth: false
        },
        {
          title: 'News & Events',
          path: '/app/dashboard/newsevents',
          auth: false
        },
       
      ]
    },

    {
      title: 'Locations',
      icon: 'tabler:map-pin',
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
      title: 'Blog',
      path: '/app/dashboard/blog',
      icon: 'tabler:file-pencil',
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
    {
      title: 'Substream',
      path: '/app/dashboard/substream',
      icon: 'tabler:clipboard-text',
      auth: false
    },

    {
      title: 'Abroad Page',
      path: '/app/dashboard/abroadpage',
      icon: 'tabler:notebook',
      auth: false
    },

    {
      title: 'Exam',
      path: '/app/dashboard/exam',
      icon: 'tabler:file-pencil',
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
