const TheContainer  = () => import('@/containers/TheContainer')
const SucIndex      = () => import('@/views/sucursal/SucIndex')
const SucCreate     = () => import('@/views/sucursal/SucCreate')
const SucShow       = () => import('@/views/sucursal/SucShow')
const SucEdit       = () => import('@/views/sucursal/SucEdit')

const SucursalRoutes = {
  path: '/sucursales',
  redirect: '/inicio',
  meta: { label: 'Sucursales'},
  component: TheContainer,
  children: [
    {
      path: '',
      component: SucIndex,
      meta:{
        title: 'Sucursales',
        requiresAdmin: true,
        permissions : ['sucursal.create','sucursal.show','sucursal.edit', 'sucursal.destroy']
      }
    },
    {
      path: 'registrar',
      meta: { label: 'Registrar' },
      name: 'Registrar Sucursal',
      component: SucCreate,
      meta:{
        title: 'Registrar Sucursal',
        requiresAdmin: true,
        permissions : ['sucursal.create']
      }
    },
    {
      path: 'detalles/:id',
      meta: { label: 'Detalles'},
      name: 'Detalles Sucursal',
      component: SucShow,
      meta:{
        title: 'Detalles Sucursal',
        requiresAdmin: true,
        permissions : ['sucursal.show','sucursal.edit']
      }
    },
    {
      path: 'editar/:id',
      meta: { label: 'Editar' },
      name: 'Editar Sucursal',
      component: SucEdit,
      meta:{
        title: 'Editar Sucursal',
        requiresAdmin: true,
        permissions : ['sucursal.edit']
      }
    },
  ]
};

export default SucursalRoutes;