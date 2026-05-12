import mongoose from "mongoose";

import throwlhos from "throwlhos";

import DinosaurModel from "./dinosaur.model.ts";

import type DinosaurRepository from "./dinosaur.repository.ts";

export default class DinosaurService {
  constructor(private readonly dinosaurRepository: DinosaurRepository) {}

  async create(dinosaur: DinosaurModel): Promise<DinosaurModel> {
    const exists = await this.dinosaurRepository.existsByName(dinosaur);

    if (exists) {
      throw throwlhos.default.err_conflict(
        `Já existe um dinossauro com o nome "${dinosaur.name}".`,
      );
    }

    const createdDinosaur = await this.dinosaurRepository.create(dinosaur);

    if (!createdDinosaur) {
      throw throwlhos.default.err_badRequest("Falha ao criar dinossauro.");
    }

    return createdDinosaur;
  }

  async createWithTransaction(dinosaur: DinosaurModel): Promise<DinosaurModel> {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const createdDinosaur = await this.dinosaurRepository.create(
        dinosaur,
        session,
      );

      if (!createdDinosaur) {
        throw throwlhos.default.err_badRequest("Falha ao criar dinossauro.");
      }

      /**
       * =========================================
       * EXEMPLO DE SEGUNDA OPERAÇÃO
       * =========================================
       *
       * Aqui você poderia:
       * - criar logs
       * - criar histórico
       * - criar auditoria
       * - criar tracking
       */

      await session.commitTransaction();

      session.endSession();

      return createdDinosaur;
    } catch (error) {
      await session.abortTransaction();

      session.endSession();

      throw error;
    }
  }

  async findAll(): Promise<DinosaurModel[]> {
    return await this.dinosaurRepository.findAll();
  }

  async findById(dinosaurId: string): Promise<DinosaurModel> {
    const dinosaur = await this.dinosaurRepository.findById(dinosaurId);

    if (!dinosaur) {
      throw throwlhos.default.err_notFound("Dinossauro não encontrado.");
    }

    return dinosaur;
  }

  async update(
    dinosaurId: string,
    dinosaur: DinosaurModel,
  ): Promise<DinosaurModel> {
    const updatedDinosaur = await this.dinosaurRepository.update(
      dinosaurId,
      dinosaur,
    );

    if (!updatedDinosaur) {
      throw throwlhos.default.err_notFound("Dinossauro não encontrado.");
    }

    return updatedDinosaur;
  }

  async delete(dinosaurId: string): Promise<boolean> {
    const deleted = await this.dinosaurRepository.delete(dinosaurId);

    if (!deleted) {
      throw throwlhos.default.err_notFound("Dinossauro não encontrado.");
    }

    return true;
  }
}
