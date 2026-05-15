import mongoose from "mongoose";
import throwlhos from "throwlhos";

import Comparison from "../../models/comparison/Comparison.ts";

import ComparisonRepository from "../../models/comparison/ComparisonRepository.ts";

import RepoRepository from "../../models/repository/RepoRepository.ts";
import BranchRepository from "../../models/branch/BranchRepository.ts";
import CommitRepository from "../../models/commit/CommitRepository.ts";

const comparisonRepository = new ComparisonRepository();

const repoRepository = new RepoRepository();
const branchRepository = new BranchRepository();
const commitRepository = new CommitRepository();

class ComparisonsService {
  async compare(data: any) {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const repositoryExists = await repoRepository.exists({
        _id: data.repositoryId,
        active: true,
      });

      if (!repositoryExists) {
        throw throwlhos.default.err_notFound("Repository not found");
      }

      const sourceBranch = await branchRepository.findOne({
        _id: data.sourceBranchId,
        repositoryId: data.repositoryId,
        active: true,
      });

      const targetBranch = await branchRepository.findOne({
        _id: data.targetBranchId,
        repositoryId: data.repositoryId,
        active: true,
      });

      if (!sourceBranch || !targetBranch) {
        throw throwlhos.default.err_notFound("Branch not found");
      }

      const sourceCommits = await commitRepository.findMany({
        branchId: data.sourceBranchId,
        active: true,
      });

      const targetCommits = await commitRepository.findMany({
        branchId: data.targetBranchId,
        active: true,
      });

      const sourceHashes = sourceCommits.map((commit: any) => commit.hash);

      const targetHashes = targetCommits.map((commit: any) => commit.hash);

      const missingInTarget = sourceHashes.filter(
        (hash) => !targetHashes.includes(hash),
      );

      const missingInSource = targetHashes.filter(
        (hash) => !sourceHashes.includes(hash),
      );

      const comparison = new Comparison({
        repositoryId: data.repositoryId,

        sourceBranchId: data.sourceBranchId,
        targetBranchId: data.targetBranchId,

        sourceCommits: sourceCommits.map((commit: any) => commit._id),

        targetCommits: targetCommits.map((commit: any) => commit._id),

        missingInTarget,
        missingInSource,

        totalSourceCommits: sourceCommits.length,
        totalTargetCommits: targetCommits.length,

        comparedAt: new Date(),

        active: true,
      });

      const result = await comparisonRepository.createOne(comparison.object, {
        session,
      });

      await session.commitTransaction();

      return result;
    } catch (err) {
      await session.abortTransaction();

      throw err;
    } finally {
      session.endSession();
    }
  }

  async findAll() {
    return comparisonRepository.findMany({
      active: true,
    });
  }

  async findById(id: string) {
    const comparison = await comparisonRepository.findById(id);

    if (!comparison) {
      throw throwlhos.default.err_notFound("Comparison not found");
    }

    return comparison;
  }
}

export default new ComparisonsService();
