const Login               = () => import('@/views/auth/Login')
const SolicRestPassword   = () => import('@/views/auth/SolicitudRestablecerPassword')
const RestablecerPassword	= () => import('@/views/auth/RestablecerPassword')
const Page104 				    = () => import('@/views/auth/pages/Page104')
const Page401             = () => import('@/views/auth/pages/Page401')
const Page403             = () => import('@/views/auth/pages/Page403')
const Page404             = () => import('@/views/auth/pages/Page404')

const PublicRoutes = {
	path: '/',
	redirect: '/login',
	name: 'Auth',
	component: {
		render (c) { return c('router-view') }
	},
	children: [
		{
			path: 'login',
			name: 'Login',
			component: Login,
      meta:{
        title: 'Login',
      }
		},
		{
			path: 'restablecer-password',
			name: 'Restablecer Contraseña',
			component: RestablecerPassword,
      meta:{
        title: 'Restablecer Contraseña',
      }
		},
		{
			path: 'solicitud-restablecer-password',
			name: 'Solicitud Para Restablecer Contraseña',
			component: SolicRestPassword,
      meta:{
        title: 'Solicitud Para Restablecer Contraseña',
      }
		},
		{
			path: '104',
			name: 'Página 104',
			component: Page104,
      meta:{
        title: 'Página 104',
      }
		},
		{
			path: '401',
			name: 'Página 401',
			component: Page401,
      meta:{
        title: 'Página 401',
      }
		},
    {
			path: '403',
			name: 'Página 405',
			component: Page403,
      meta:{
        title: 'Página 403',
      }
		},
		{
			path: '404',
			name: 'Página 404',
			component: Page404,
      meta:{
        title: 'Página 401',
      }
		},
	]
};

export default PublicRoutes;