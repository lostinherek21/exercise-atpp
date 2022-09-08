export interface IRoute {
  AddRoute(route: any): void;
}

export default class RouteEngine {
  private routing: IRoute[] = [];

  Add<T extends IRoute>(routing: new () => T, route: any): RouteEngine {
    const routed = new routing();
    routed.AddRoute(route);
    this.routing.push(routed);
    return this;
  }
}
