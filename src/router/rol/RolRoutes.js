const TheContainer  = () => import('@/containers/TheContainer')
const RolIndex      = () => import('@/views/rol/RolIndex')
const RolCreate     = () => import('@/views/rol/RolCreate')
const RolShow       = () => import('@/views/rol/RolShow')
const RolEdit       = () => import('@/views/rol/RolEdit')

const RolRoutes = {
  path: '/roles',
  redirect: '/inicio',
  meta: { label: 'Roles'},
  component: TheContainer,
  children: [
    {
      path: '',
      component: RolIndex,
      meta:{
        title: 'Roles',
        requiresAdmin: true,
        permissions : ['rol.create','rol.show','rol.edit', 'rol.destroy']
      }
    },
    {
      path: 'registrar',
      meta: { label: 'Registrar' },
      name: 'Registrar Rol',
      component: RolCreate,
      meta:{
        title: 'Registrar Rol',
        requiresAdmin: true,
        permissions : ['rol.create']
      }
    },
    {
      path: 'detalles/:id',
      meta: { label: 'Detalles'},
      name: 'Detalles Rol',
      component: RolShow,
      meta:{
        title: 'Detalles Rol',
        requiresAdmin: true,
        permissions : ['rol.show','rol.edit']
      }
    },
    {
      path: 'editar/:id',
      meta: { label: 'Editar' },
      name: 'Editar Rol',
      component: RolEdit,
      meta:{
        title: 'Editar Rol',
        requiresAdmin: true,
        permissions : ['rol.edit']
      }
    },
  ]
};

export default RolRoutes;