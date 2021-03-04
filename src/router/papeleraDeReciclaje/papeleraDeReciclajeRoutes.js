const TheContainer  = () => import('@/containers/TheContainer')
const PapIndex      = () => import('@/views/papeleraDeReciclaje/PapIndex')

const papeleraDeReciclajeRoutes = {
  path: '/papelera',
  redirect: '/inicio',
  meta: { label: 'Papelera'},
  component: TheContainer,
  children: [
    {
      path: '',
      component: PapIndex,
      meta:{
        title: 'Papelera',
        requiresAdmin: true,
        permissions : ['papeleraDeReciclaje.show', 'papeleraDeReciclaje.destroy', 'papeleraDeReciclaje.restore']
      }
    },
  ]
};

export default papeleraDeReciclajeRoutes;