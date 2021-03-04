const TheContainer  = () => import('@/containers/TheContainer')
const QysIndex      = () => import('@/views/quejaYSugerencia/QysIndex')
const QysCreate     = () => import('@/views/quejaYSugerencia/QysCreate')
const QysShow       = () => import('@/views/quejaYSugerencia/QysShow')

const QuejaYSugerenciaRoutes = {
  path: '/quejas-y-sugerencias',
  redirect: '/inicio',
  meta: { label: 'Quejas y Sugerencias'},
  component: TheContainer,
  children: [
    {
      path: '',
      component: QysIndex,
      meta:{
        title: 'Quejas y Sugerencias',
        requiresAdmin: true,
        permissions : ['quejaYSugerencia.create','quejaYSugerencia.show','quejaYSugerencia.edit', 'quejaYSugerencia.destroy']
      }
    },
    {
      path: 'registrar',
      meta: { label: 'Registrar' },
      name: 'Registrar Queja y Sugerencia',
      component: QysCreate,
      meta:{
        title: 'Registrar Queja y Sugerencia',
        requiresAdmin: true,
        permissions : ['quejaYSugerencia.create']
      }
    },
    {
      path: 'detalles/:id',
      meta: { label: 'Detalles'},
      name: 'Detalles Queja y Sugerencia',
      component: QysShow,
      meta:{
        title: 'Detalles Queja y Sugerencia',
        requiresAdmin: true,
        permissions : ['quejaYSugerencia.show','quejaYSugerencia.edit']
      }
    }
  ]
};

export default QuejaYSugerenciaRoutes;