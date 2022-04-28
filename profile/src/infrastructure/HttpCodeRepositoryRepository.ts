import { CodeRepository } from "../domain/CodeRepository/CodeRepository.ts";
import { CodeRepositoryRepository } from "../domain/CodeRepository/CodeRepositoryRepository.ts";

export class HttpCodeRepositoryRepository implements CodeRepositoryRepository {
  public async getTopRepositories(): Promise<CodeRepository[]> {
    await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: `{
  organization(login: "streamdevs") {
    repositories(first: 3, orderBy: {field: STARGAZERS, direction: DESC}) {
      nodes {
        name
        stargazerCount
      }
    }
  }
}
      `,
      headers: { "content-type": "application/json" },
    });

    return Promise.resolve([]);
  }
}
