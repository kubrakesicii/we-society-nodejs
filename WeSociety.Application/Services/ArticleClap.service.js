const context = require("../../WeSociety.Persistence/Context/DbContext");
const { OK, SuccessResponse } = require("../Reponses/Response");
require("core-js/actual/array/group-by");
const articleClapMapping = require("../Mappings/ArticleClap.mapping")

module.exports = {
  insert: async (req, res, next) => {
    const data = req.body;
    await context.ArticleClap.create(data);
    return new SuccessResponse(res);
  },

  getAllByArticle: async (req, res, next) => {
    const claps = await context.ArticleClap.findAll({
      include: [
        {
          association: "UserProfile",
          include: ["User"],
        },
      ],
      where: {
        ArticleId: req.query.articleId,
      },
    });

    const grouped = claps.groupBy((clap) => {
      return clap.UserProfileId
    });

    const clapDtos = Object.entries(grouped).map((g) =>
      articleClapMapping.GetArticleClapDto(g[1])
    );

    return new OK(res, clapDtos);
  },
};
