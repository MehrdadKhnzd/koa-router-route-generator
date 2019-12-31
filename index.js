const routeFlattener = (routes, path='') => {
  let flattenedRoutes = {};
  Object.keys(routes).map(route => {
    const children = routes[route].children;
    delete routes[route].children;
    flattenedRoutes[path + route] = routes[route];
    if (children) {
      Object.assign(flattenedRoutes, routeFlattener(children, path + route));
    }
  });
  return flattenedRoutes;
}

  (Array.isArray(routeGroups) ? routeGroups : [routeGroups]).forEach(routeGroup => {
    Object.keys(routeGroup).forEach(method => {
      Object.keys(routeGroup[method]).forEach(route => {
        router[method](...[route, ...(Array.isArray(routeGroup[method][route]) ? routeGroup[method][route] : [routeGroup[method][route]])]);
      });
    })
  });
};