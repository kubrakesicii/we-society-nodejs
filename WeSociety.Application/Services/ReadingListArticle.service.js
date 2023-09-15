const context = require("../../WeSociety.Persistence/context/dbContext");
const articleMapping = require("../mappings/article.mapping");
const userProfileMapping = require("../mappings/userProfile.mapping");
const categoryMapping = require("../mappings/category.mapping");

module.exports = {
  insert: async (data) => {
    await context.ReadingListArticle.create(data);
  },

  getArticlesByList: async (readingListId) => {
    const readingListArticles = await context.ReadingListArticle.findAll({
      include: [
        {
          association: "Article",
          include: [
            "Category",
            {
              association: "UserProfile",
              include: ["User"],
            },
          ],
        },
      ],
      where: {
        ReadingListId: readingListId,
      },
      distinct: true,
    });

    const articleDtos = [];
    readingListArticles.map((readList) => {
      const aDto = articleMapping.GetArticleDto(readList.Article);
      aDto.userProfile = userProfileMapping.GetUserProfileDto(
        readList.Article.UserProfile
      );
      aDto.category = categoryMapping.GetCategoryDto(readList.Article.Category);
      articleDtos.push(aDto);
    });
    return articleDtos;
  },

  getIsSaved: async (articleId,userProfileId) => {
    const readingListArticle = await context.ReadingListArticle.findOne({
      include: ["ReadingList"],
      where: {
        ArticleId: articleId,
        "$ReadingList.UserProfileId$": userProfileId,
      },
    });

    const savedRes =
      readingListArticle == null
        ? { id: 0, isSaved: false }
        : { id: readingListArticle.Id, isSaved: true };
    return savedRes;
  },

  removeSaved: async (id) => {
    const affectedRows = await context.ReadingListArticle.destroy({
      where: {
        Id: id,
      },
    });

    if (affectedRows == 0) throw new NotfoundError();
  },
};
