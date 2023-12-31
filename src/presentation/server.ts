import express from 'express';
import { Router } from 'express';
import cors from 'cors';

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    // this.app.use(fileUpload({
    //   limits: { fileSize: 50 * 1024 * 1024 },
    // }));

    this.app.use(cors());

    //* Public Folder
    // this.app.use( express.static( this.publicPath ) );

    //* Routes
    this.app.use(this.routes);

    //* SPA
    // this.app.get('*', (req, res) => {
    //   const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
    //   res.sendFile(indexPath);
    // });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
