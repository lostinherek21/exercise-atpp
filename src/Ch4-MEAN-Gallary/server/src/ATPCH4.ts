import RouteEngine from "./Routes/RouteEngine";
import Server from "./Server";
import RouteFactory from "./Routes/RouteFactory";

export default class ATPCH4 extends Server {
  protected AddRouting(factory: RouteFactory, route: any): void {
    factory.Build(route);
  }
}
