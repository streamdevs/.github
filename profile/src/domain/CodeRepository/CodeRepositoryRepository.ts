import { CodeRepository } from "./CodeRepository.ts";

export interface CodeRepositoryRepository {
  getTopRepositories: () => Promise<CodeRepository[]>;
}
