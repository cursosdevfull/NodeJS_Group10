import { EntityManager } from "typeorm";

export interface IUnitOfWork {
    start(): void;
    complete(work: () => Promise<void>): Promise<void>;
    getManager(): EntityManager;
}
