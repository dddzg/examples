declare module 'egg' {

  import * as KoaApplication from 'koa';

  class BaseClass {
    public ctx: Context;
    public app: Application;
    constructor(ctx: Context);
  }

  interface Logger {
    info: Function;
    warn: Function;
    debug: Function;
    error: Function;
  }

  
  export interface Router{


    get(path: string, fn: Function | string): Router;
    get(router: string, path: string, fn: Function | string): Router;
    get(path: string, ...middleware: KoaApplication.Middleware[], fn: Function | string): Router;
    get(router: string, path: string, ...middleware: KoaApplication.Middleware[], fn: Function | string): Router;
    
    put(path: string, fn: Function | string): Router;
    put(router: string, path: string, fn: Function | string): Router;
    put(path: string, ...middleware: KoaApplication.Middleware[], fn: Function | string): Router;
    put(router: string, path: string, ...middleware: KoaApplication.Middleware[], fn: Function | string): Router;
    
    post(path: string, fn: Function | string): Router;
    post(router: string, path: string, fn: Function | string): Router;
    post(path: string, ...middleware: KoaApplication.Middleware[], fn: Function | string): Router;
    post(router: string, path: string, ...middleware: KoaApplication.Middleware[], fn: Function | string): Router;
    
    delete(path: string, fn: Function | string): Router;
    delete(router: string, path: string, fn: Function | string): Router;
    delete(path: string, ...middleware: KoaApplication.Middleware[], fn: Function | string): Router;
    delete(router: string, path: string, ...middleware: KoaApplication.Middleware[], fn: Function | string): Router;
    
    /**
     * restful router api
     */
    resources(router:string, path: string, fn: Function | string):Router;

    
    redirect(path: string, redirectPath: string):Router;

    
  }
  /**
   * Singleton instance in App Worker, extend EggApplication
   */
  export interface Application extends KoaApplication, Router{

    /**
     * The configuration of application
     */
    config: any;

    /**
     * app.env delegate app.config.env
     */
    env: string;

    /**
     * global locals for view
     */
    locals: Object;

    /**
     * application logger, log file is $HOME/logs/{appname}/{appname}-web
     */
    logger: Logger;

    /**
     * All loggers contain logger, coreLogger and customLogger
     */
    loggers: { [loggerName: string]: Logger };

    /**
     * create a singleton instance
     */
    addSingleton(name: string, create: Object): void;

    /**
     * http request helper base on httpclient, it will auto save httpclient log.
     * Keep the same api with httpclient.request(url, args).
     * See https://github.com/node-modules/urllib#api-doc for more details.
     */
    curl(url: string, opt: Object): Promise<any>;

    /**
     * Get logger by name, it's equal to app.loggers['name'], but you can extend it with your own logical
     */
    getLogger(name: string): Logger;

    controller:IController;

    serviceClasses:IService; //egg-core/lib/loader/mixin/service.js

  }

  export interface Context extends KoaApplication.Context {

    app: Application;

    service: IService;

    params: any;

    render: Function;

    redirect(url: string);

    curl(url: string, opt: Object): Promise<any>;
  }

  export class Controller extends BaseClass { }

  export class Service extends BaseClass { }

  export interface IService { }

  export interface IController { }

}
