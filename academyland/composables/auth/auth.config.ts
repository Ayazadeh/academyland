interface RegexRoute {
  regex: string[];
}

type AuthRoute = string | RegexRoute;

export const AuthRoutes: AuthRoute[] = [
  '/base',
  { regex: [/\/profile/.source] },
];