import CommitRepository from "../../models/commit/CommitRepository.ts";
import BranchRepository from "../../models/branch/BranchRepository.ts";
import RepoRepository from "../../models/repository/RepoRepository.ts";
import Commit from "../../models/commit/Commit.ts";
import throwlhos from "throwlhos";

const commitRepository = new CommitRepository();

const repoRepository = new RepoRepository();
const branchRepository = new BranchRepository();

class CommitsService {
  async create(data: any) {
    const repositoryExists = await repoRepository.exists({
      _id: data.repositoryId,
      active: true,
    });

    if (!repositoryExists) {
      throw throwlhos.default.err_notFound("Repository not found");
    }

    const branchExists = await branchRepository.exists({
      _id: data.branchId,
      repositoryId: data.repositoryId,
      active: true,
    });

    if (!branchExists) {
      throw throwlhos.default.err_notFound("Branch not found");
    }

    const commitExists = await commitRepository.exists({
      hash: data.hash,
    });

    if (commitExists) {
      throw throwlhos.default.err_conflict("Commit hash already exists");
    }

    const commit = new Commit({
      ...data,
      active: true,
    });

    return commitRepository.createOne(commit.object);
  }

  async findAll() {
    return commitRepository.findMany({
      active: true,
    });
  }

  async findById(id: string) {
    const commit = await commitRepository.findById(id);

    if (!commit) {
      throw throwlhos.default.err_notFound("Commit not found");
    }

    return commit;
  }

  async update(id: string, data: any) {
    const commit = await commitRepository.updateOne(
      {
        _id: id,
      },
      data,
    );

    if (!commit) {
      throw throwlhos.default.err_notFound("Commit not found");
    }

    return commit;
  }

  async delete(id: string) {
    const commit = await commitRepository.updateOne(
      {
        _id: id,
      },
      {
        active: false,
      },
    );

    if (!commit) {
      throw throwlhos.default.err_notFound("Commit not found");
    }

    return commit;
  }
}

export default new CommitsService();
