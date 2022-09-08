import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import RouteEngine from "./Routes/RouteEngine";
import RouteFactory from './Routes/RouteFactory';
import Mongo from './Mongodb/Mongo';

export default abstract class Server {
  private router :any
  protected abstract AddRouting(routingFactory: RouteFactory, route: any): void;
  constructor(private port: number = 3000, private app = express(),private mongo = new Mongo()) {}

  public async Start() {
    this.app.use(bodyParser.json({ limit: "100mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
    this.app.use(cors());

    this.router = express.Router()
    this.app.use(this.router)
    this.AddRouting(new RouteFactory(),this.router)

    this.mongo.Connect()

    this.OnStart();
    this.app.listen(this.port, () => {
      console.log("server start at: http://localhost:3000");
    });
  }

  protected OnStart() {
    this.app.get("/", (request, response) => {
      response.send("Hello from server");
    });
  }
}
