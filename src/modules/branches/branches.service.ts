import throwlhos from "throwlhos";

import Branch from "../../models/branch/Branch.ts";

import BranchRepository from "../../models/branch/BranchRepository.ts";
import RepoRepository from "../../models/repository/RepoRepository.ts";

const branchRepository = new BranchRepository();
const repoRepository = new RepoRepository();

class BranchesService {
  async create(data: any) {
    const repositoryExists = await repoRepository.exists({
      _id: data.repositoryId,
      active: true,
    });

    if (!repositoryExists) {
      throw throwlhos.default.err_notFound("Repository not found");
    }

    const alreadyExists = await branchRepository.exists({
      repositoryId: data.repositoryId,
      name: data.name,
    });

    if (alreadyExists) {
      throw throwlhos.default.err_conflict(
        "Branch already exists in repository",
      );
    }

    const branch = new Branch({
      ...data,
      active: true,
    });

    return branchRepository.createOne(branch.object);
  }

  async findAll() {
    return branchRepository.findMany({
      active: true,
    });
  }

  async findById(id: string) {
    const branch = await branchRepository.findById(id);

    if (!branch) {
      throw throwlhos.default.err_notFound("Branch not found");
    }

    return branch;
  }

  async update(id: string, data: any) {
    const branch = await branchRepository.updateOne(
      {
        _id: id,
      },
      data,
    );

    if (!branch) {
      throw throwlhos.default.err_notFound("Branch not found");
    }

    return branch;
  }

  async delete(id: string) {
    const branch = await branchRepository.updateOne(
      {
        _id: id,
      },
      {
        active: false,
      },
    );

    if (!branch) {
      throw throwlhos.default.err_notFound("Branch not found");
    }

    return branch;
  }
}

export default new BranchesService();
