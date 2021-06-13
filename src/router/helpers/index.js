export function auth(routes) {
  if (!(routes instanceof Array)) throw new Error("routes must be an array");
  return routes.map(route => {
    if (!route.meta) route.meta = {};
    route.meta.auth = true;
    return route;
  });
}

export function requiredPropsValidate(
  to,
  next,
  requiredField,
  failedRouteName
) {
  const params = Object.keys(to.params);

  if (params.includes(...requiredField)) {
    next();
  } else {
    next({ name: failedRouteName });
  }
}
