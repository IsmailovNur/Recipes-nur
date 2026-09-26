export const AppRoutes = {
  main: '/',

  login: '/login',
  register: '/register',

  recipe: '/recipes/:id',
  user: '/users/:id',
  newRecipe: '/recipes/new',

  notFound: '*',
} as const;