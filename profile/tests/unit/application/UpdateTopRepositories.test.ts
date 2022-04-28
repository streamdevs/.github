import { asserts, sinon } from "../../../deps.ts";
import { UpdateTopRepositories } from "../../../src/application/UpdateTopRepositories.ts";

Deno.test("UpdateTopRepositories", async (t) => {
  await t.step(
    "it calls the CodeRepositoryRepository to get the top 3 repositories",
    async () => {
      const codeRepositoryRepository = {
        getTopRepositories: sinon.spy(() => Promise.resolve([])),
      };
      const subject = new UpdateTopRepositories(codeRepositoryRepository);

      await subject.execute();

      asserts.assertEquals(
        codeRepositoryRepository.getTopRepositories.called,
        true
      );
    }
  );
});
