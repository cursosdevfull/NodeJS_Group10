export abstract class Bootstrap {
  abstract initialize(): Promise<any>;
  abstract close(): void;
}
