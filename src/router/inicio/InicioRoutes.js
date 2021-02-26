const TheContainer  = () => import('@/containers/TheContainer')
const Dashboard     = () => import('@/views/Dashboard')

const InicioRoutes = {
  path: '/',
  redirect: '/login',
//  name: '',
  component: TheContainer,
  children: [
    {
      path: 'inicio',
      name: 'Inicio',
      component: Dashboard,
      meta:{
        title: 'Inicio',
        requiresAdmin: true,
        permissions : ['global']
      }
    }
  ]
};

export default InicioRoutes;