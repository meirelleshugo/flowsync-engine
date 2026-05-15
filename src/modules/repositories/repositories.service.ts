import throwlhos from "throwlhos";

import Repo from "../../models/repository/Repo.ts";
import RepoRepository from "../../models/repository/RepoRepository.ts";

const repoRepository = new RepoRepository();

class RepositoriesService {
  async create(data: any) {
    const alreadyExists = await repoRepository.exists({
      name: data.name,
    });

    if (alreadyExists) {
      throw throwlhos.default.err_conflict("Repository already exists");
    }

    const repo = new Repo({
      ...data,
      active: true,
    });

    return repoRepository.createOne(repo.object);
  }

  async findAll() {
    return repoRepository.findMany({
      active: true,
    });
  }

  async findById(id: string) {
    const repository = await repoRepository.findById(id);

    if (!repository) {
      throw throwlhos.default.err_notFound("Repository not found");
    }

    return repository;
  }

  async update(id: string, data: any) {
    const repository = await repoRepository.updateOne(
      {
        _id: id,
      },
      data,
    );

    if (!repository) {
      throw throwlhos.default.err_notFound("Repository not found");
    }

    return repository;
  }

  async delete(id: string) {
    const repository = await repoRepository.updateOne(
      {
        _id: id,
      },
      {
        active: false,
      },
    );

    if (!repository) {
      throw throwlhos.default.err_notFound("Repository not found");
    }

    return repository;
  }
}

export default new RepositoriesService();
