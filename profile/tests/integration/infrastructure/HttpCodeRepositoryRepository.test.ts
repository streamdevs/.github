import { asserts, denock } from "../../../deps.ts";
import { HttpCodeRepositoryRepository } from "../../../src/infrastructure/HttpCodeRepositoryRepository.ts";

Deno.test("HttpCodeRepositoryRepository", async (t) => {
  await t.step("it calls the GitHub API", async () => {
    const scope = denock({
      method: "POST",
      protocol: "https",
      host: "api.github.com",
      headers: [
        {
          header: "content-type",
          value: "application/json",
        },
      ],
      path: "/graphql",
      replyStatus: 200,
      requestBody: `{
        organization(login: "streamdevs") {
          repositories(first: 3, orderBy: {field: STARGAZERS, direction: DESC}) {
            nodes {
              name
              stargazerCount
            }
          }
        }
      }`,
      responseBody: {
        data: {
          organization: {
            repositories: {
              nodes: [
                {
                  name: "webhook",
                  stargazerCount: 29,
                },
                {
                  name: "lights",
                  stargazerCount: 8,
                },
                {
                  name: "platform",
                  stargazerCount: 5,
                },
              ],
            },
          },
        },
      },
    });

    const subject = new HttpCodeRepositoryRepository();

    await subject.getTopRepositories();

    asserts.assertEquals(scope.called(), 1);
  });
});
