const TheContainer  = () => import('@/containers/TheContainer')
const PerIndex      = () => import('@/views/permiso/PerIndex')
const PerShow       = () => import('@/views/permiso/PerShow')
const PerEdit       = () => import('@/views/permiso/PerEdit')

const PermisoRoutes = {
  path: '/permisos',
  redirect: '/inicio',
  meta: { label: 'Permisos'},
  component: TheContainer,
  children: [
    {
      path: '',
      component: PerIndex,
      meta:{
        title: 'Permisos',
        requiresAdmin: true,
        permissions : ['rol.create','rol.show','rol.edit']
      }
    },
    {
      path: 'detalles/:id',
      meta: { label: 'Detalles'},
      name: 'Detalles Permiso',
      component: PerShow,
      meta:{
        title: 'Detalles Permiso',
        requiresAdmin: true,
        permissions : ['rol.show','rol.edit']
      }
    },
    {
      path: 'editar/:id',
      meta: { label: 'Editar' },
      name: 'Editar Permiso',
      component: PerEdit,
      meta:{
        title: 'Editar Permiso',
        requiresAdmin: true,
        permissions : ['rol.edit']
      }
    },
  ]
};

export default PermisoRoutes;