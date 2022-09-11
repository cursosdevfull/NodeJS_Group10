import * as winston from "winston";
const logstash = require("winston-logstash-transport");

export class Logger {
  static instance: Logger;

  MESSAGE = Symbol.for("message");
  LEVEL = Symbol.for("level");

  transports: any[] = [];
  logger: winston.Logger;

  private constructor() {
    this.apply = this.apply.bind(this);
  }

  static getLogger(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
      Logger.instance
        .addTransport(Transport.console)
        .addTransport(Transport.ekl)
        .apply();
    }
    return Logger.instance.logger;
  }

  addTransport(transport: any) {
    this.transports.push(transport);
    return this;
  }

  apply() {
    const logger: any = winston.createLogger({
      level: "info",
      transports: this.transports,
    });

    this.logger = logger;
  }
}

export class Transport {
  static get console() {
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.cli({
          colors: {
            error: "red",
            warn: "yellow",
            info: "green",
            debug: "blue",
            verbose: "cyan",
            http: "magenta",
          },
        })
      ),
      handleExceptions: true,
    });
  }

  static get ekl() {
    return new logstash.LogstashTransport({
      host: "localhost",
      port: 1514,
    });
  }
}
