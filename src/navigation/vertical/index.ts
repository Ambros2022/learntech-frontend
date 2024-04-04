// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from 'src/hooks/useAuth'

const navigation = (): VerticalNavItemsType => {
  const { user } = useAuth()

  return [
    
    {
      title: 'Dashboard',
      path: '/home',
      icon: 'tabler:smart-home',
      action:'manage',
      subject:'dashboard',
      auth:false
    },
    {
      title: 'Location',
      auth:false,
      icon: 'tabler:location',
     
      children: [
        {
          title: 'Countries',
          path: '/countries',
          action: 'read',
          auth:false
        },

      ]
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'tabler:mail',
      auth:false
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield',
    }
  ]
}

export default navigation
