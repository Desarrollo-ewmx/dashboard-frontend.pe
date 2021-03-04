const TheContainer  = () => import('@/containers/TheContainer')
const ActIndex      = () => import('@/views/actividad/ActIndex')

const ActividadRoutes = {
  path: '/actividades',
  redirect: '/inicio',
  meta: { label: 'Actividades'},
  component: TheContainer,
  children: [
    {
      path: '',
      component: ActIndex,
      meta:{
        title: 'Actividades',
        requiresAdmin: true,
        permissions : ['actividad.show', 'actividad.destroy']
      }
    }
  ]
};

export default ActividadRoutes;