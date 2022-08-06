import { EntityManager, QueryRunner } from "typeorm";
import { IUnitOfWork } from "./unit-of-work.interface";

export class UnitOfWork implements IUnitOfWork {
  private queryRunner: QueryRunner;
  private transactionManager: EntityManager;

  constructor(manager: EntityManager) {
    this.queryRunner = manager.connection.createQueryRunner();
  }

  async start() {
    await this.queryRunner.startTransaction();
    this.setTransaction();
  }
  async complete(work: () => Promise<void>): Promise<void> {
    try {
      await work();
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
    } finally {
      await this.queryRunner.release();
    }
  }

  getManager(): EntityManager {
    if (
      !this.transactionManager ||
      !(this.transactionManager instanceof EntityManager)
    ) {
      throw new Error("Transaction not started");
    }
    return this.queryRunner.manager;
  }

  private setTransaction() {
    this.transactionManager = this.queryRunner.manager;
  }
}
