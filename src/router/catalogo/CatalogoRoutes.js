const TheContainer  = () => import('@/containers/TheContainer')
const CatIndex      = () => import('@/views/catalogo/CatIndex')
const CatCreate     = () => import('@/views/catalogo/CatCreate')
const CatShow       = () => import('@/views/catalogo/CatShow')
const CatEdit       = () => import('@/views/catalogo/CatEdit')

const CatalogoRoutes = {
  path: '/catalogos',
  redirect: '/inicio',
  meta: { label: 'Catalogos'},
  component: TheContainer,
  children: [
    {
      path: '',
      component: CatIndex,
      meta:{
        title: 'Catalogos',
        requiresAdmin: true,
        permissions : ['catalogo.create','catalogo.show','catalogo.edit', 'catalogo.destroy']
      }
    },
    {
      path: 'registrar',
      meta: { label: 'Registrar' },
      name: 'Registrar Catálogo',
      component: CatCreate,
      meta:{
        title: 'Registrar Catálogo',
        requiresAdmin: true,
        permissions : ['catalogo.create']
      }
    },
    {
      path: 'detalles/:id',
      meta: { label: 'Detalles'},
      name: 'Detalles Catálogo',
      component: CatShow,
      meta:{
        title: 'Detalles Catálogo',
        requiresAdmin: true,
        permissions : ['catalogo.show']
      }
    },
    {
      path: 'editar/:id',
      meta: { label: 'Editar' },
      name: 'Editar Catálogo',
      component: CatEdit,
      meta:{
        title: 'Editar Catálogo',
        requiresAdmin: true,
        permissions : ['catalogo.edit']
      }
    },
  ]
};

export default CatalogoRoutes;