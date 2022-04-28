import { CodeRepositoryRepository } from "../domain/CodeRepository/CodeRepositoryRepository.ts";

export class UpdateTopRepositories {
  public constructor(
    private readonly codeRepositoryRepository: CodeRepositoryRepository
  ) {}

  public async execute(): Promise<void> {
    await this.codeRepositoryRepository.getTopRepositories();
  }
}
