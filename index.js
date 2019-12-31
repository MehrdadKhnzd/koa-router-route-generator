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

const routeGenerator = (router, routeGroups) => {
  (Array.isArray(routeGroups) ? routeGroups : [routeGroups]).forEach(routeGroup => {
    Object.keys(routeGroup).forEach(method => {
      const flattenedRoutes = routeFlattener(routeGroup[method]);
      Object.keys(flattenedRoutes).forEach(route => {
        if (Array.isArray(routeGroup[method][route]) && routeGroup[method][route].length !== 0) {
          router[method](route, ...routeGroup[method][route]);
        } else if (typeof routeGroup[method][route] === 'function') {
          router[method](route, routeGroup[method][route]);
        } else {
          if (Array.isArray(routeGroup[method][route][handler]) && routeGroup[method][route][handler].length !== 0) {
            if (routeGroup[method][route][name]) {
              router[method](routeGroup[method][route][name], router, ...routeGroup[method][route])
            } else {
              router[method](router, ...routeGroup[method][route])
            }
          } else if (typeof routeGroup[method][route][handler] === 'function') {
            if (routeGroup[method][route][name]) {
              router[method](routeGroup[method][route][name], router, routeGroup[method][route])
            } else {
              router[method](router, routeGroup[method][route])
            }
          }
        }
      });
    })
  });
};