const TheContainer    = () => import('@/containers/TheContainer')
const PerfilDetalles  = () => import('@/views/perfil/recordatorio/Index')
const PerfilEditar    = () => import('@/views/perfil/recordatorio/Index')
const Recordatorio    = () => import('@/views/perfil/recordatorio/Index')
const Tablero         = () => import('@/views/perfil/recordatorio/Index')

const PerfilRoutes = {
  path: '/perfil',
  redirect: '/inicio',
  meta: { label: 'Perfil'},
  component: TheContainer,
  children: [
    {
      path: 'detalles',
      meta: { label: 'Detalles' },
      name: 'Detalles',
      component: PerfilDetalles,
      meta:{
        title: 'Detalles Perfil',
        requiresAdmin: true,
        permissions : ['global']
      }
    },
    {
      path: 'editar',
      meta: { label: 'Editar' },
      name: 'Editar',
      component: PerfilEditar,
      meta:{
        title: 'Editar Perfil',
        requiresAdmin: true,
        permissions : ['global']
      }
    },
    {
      path: 'recordatorios',
      meta: { label: 'Recordatorios' },
      name: 'Recordatorios',
      component: Recordatorio,
      meta:{
        title: 'Recordatorios',
        requiresAdmin: true,
        permissions : ['global']
      }
    },
    {
      path: 'tablero',
      meta: { label: 'Tablero' },
      name: 'Tablero',
      component: Tablero,
      meta:{
        title: 'Tablero',
        requiresAdmin: true,
        permissions : ['global']
      }
    },
  ]
};

export default PerfilRoutes;
