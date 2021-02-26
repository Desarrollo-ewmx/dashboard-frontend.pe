const TheContainer  = () => import('@/containers/TheContainer')
const UsuIndex      = () => import('@/views/usuario/UsuIndex')
const UsuCreate     = () => import('@/views/usuario/UsuCreate')
const UsuShow       = () => import('@/views/usuario/UsuShow')
const UsuEdit       = () => import('@/views/usuario/UsuEdit')

const UsuarioRoutes = {
  path: '/usuarios',
  redirect: '/inicio',
  meta: { label: 'Usuarios'},
  component: TheContainer,
  children: [
    {
      path: '',
      component: UsuIndex,
      meta:{
        title: 'Usuarios',
        requiresAdmin: true,
        permissions : ['usuario.create','usuario.show','usuario.edit', 'usuario.destroy']
      }
    },
    {
      path: 'registrar',
      meta: { label: 'Registrar' },
      name: 'Registrar Usuario',
      component: UsuCreate,
      meta:{
        title: 'Registrar Usuario',
        requiresAdmin: true,
        permissions : ['usuario.create']
      }
    },
    {
      path: 'detalles/:id',
      meta: { label: 'Detalles'},
      name: 'Detalles Usuario',
      component: UsuShow,
      meta:{
        title: 'Detalles Usuario',
        requiresAdmin: true,
        permissions : ['usuario.show']
      }
    },
    {
      path: 'editar/:id',
      meta: { label: 'Editar' },
      name: 'Editar Usuario',
      component: UsuEdit,
      meta:{
        title: 'Editar Usuario',
        requiresAdmin: true,
        permissions : ['usuario.edit']
      }
    },
  ] 
};

export default UsuarioRoutes;