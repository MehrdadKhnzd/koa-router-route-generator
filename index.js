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
        if (Array.isArray(flattenedRoutes[route]) && flattenedRoutes[route].length !== 0) {
          router[method](route, ...flattenedRoutes[route]);
        } else if (typeof flattenedRoutes[route] === 'function') {
          router[method](route, flattenedRoutes[route]);
        } else {
          if (Array.isArray(flattenedRoutes[route].handler) && flattenedRoutes[route].handler.length !== 0) {
            if (flattenedRoutes[route][name]) {
              router[method](flattenedRoutes[route][name], router, ...flattenedRoutes[route])
            } else {
              router[method](router, ...flattenedRoutes[route])
            }
          } else if (typeof flattenedRoutes[route].handler === 'function') {
            if (flattenedRoutes[route][name]) {
              router[method](flattenedRoutes[route][name], router, flattenedRoutes[route])
            } else {
              router[method](router, flattenedRoutes[route])
            }
          }
        }
      });
    })
  });
};

module.exports = routeGenerator;