module.exports = (router, routeGroups) => {
  (Array.isArray(routeGroups) ? routeGroups : [routeGroups]).forEach(routeGroup => {
    Object.keys(routeGroup).forEach(method => {
      Object.keys(routeGroup[method]).forEach(route => {
        router[method](...[route, ...(Array.isArray(routeGroup[method][route]) ? routeGroup[method][route] : [routeGroup[method][route]])]);
      });
    })
  });
};