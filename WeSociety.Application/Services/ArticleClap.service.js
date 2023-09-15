const context = require("../../WeSociety.Persistence/context/dbContext");
require("core-js/actual/array/group-by");
const articleClapMapping = require("../mappings/articleClap.mapping")

module.exports = {
  insert: async (req, res, next) => {
    await context.ArticleClap.create(data);
  },

  getAllByArticle: async (articleId) => {
    const claps = await context.ArticleClap.findAll({
      include: [
        {
          association: "UserProfile",
          include: ["User"],
        },
      ],
      where: {
        ArticleId: articleId,
      },
    });

    const grouped = claps.groupBy((clap) => {
      return clap.UserProfileId
    });

    const clapDtos = Object.entries(grouped).map((g) =>
      articleClapMapping.GetArticleClapDto(g[1])
    );

    return clapDtos;
  },
};
