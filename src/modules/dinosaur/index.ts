import DinosaurRepository from "./dinosaur.repository.ts";

import DinosaurService from "./dinosaur.service.ts";

export const DinosaurRepositoryImp = new DinosaurRepository();

export const DinosaurServiceImp = new DinosaurService(DinosaurRepositoryImp);
