const context = require("../../WeSociety.Persistence/context/dbContext");
const userProfileMapping = require("../mappings/userProfile.mapping");
const articleMapping = require("../mappings/article.mapping");
const categoryMapping = require("../mappings/category.mapping");

module.exports = {
  insert: async (data) => {
    await context.Article.create(data);
  },

  getById: async (id) => {
    const article = await context.Article.findOne({
      include: [
        { association: "UserProfile", include: ["User"] },
        "Comments",
        "Claps",
        "Category",
      ],
      where: { Id: id },
    });

    if(article == null) throw new NotfoundError()

    const articleDto = articleMapping.GetArticleDto(article);
    articleDto.userProfile = userProfileMapping.GetUserProfileDto(
      article.UserProfile
    );
    articleDto.category = categoryMapping.GetCategoryDto(article.Category);
    return articleDto
  },

  getAll: async (pageIndex,pageSize,categoryId) => {
    let whereCond = { IsPublished: 1 };
    if (categoryId != null && categoryId != 0) {
      whereCond = { ...whereCond, CategoryId: categoryId };
    }

    const articles = await context.Article.findAndCountAll({
      where: whereCond,
      include: [
        { association: "UserProfile", include: ["User"] },
        "Comments",
        "Claps",
        "Category",
      ],
      order: [["CreatedTime", "DESC"]],
      limit: pageSize == null ? 10 : pageSize,
      offset: pageIndex == null ? 0 : pageIndex,
      distinct: true,
    });

    const articleDtos = [];
    articles.rows.map((a) => {
      const articleDto = articleMapping.GetArticleDto(a);
      articleDto.userProfile = userProfileMapping.GetUserProfileDto(
        a.UserProfile
      );
      // articleDto.userProfile = userProfileMapping.GetUserProfileDto(a.UserProfile)
      articleDto.category = categoryMapping.GetCategoryDto(a.Category);
      articleDtos.push(articleDto);
    });

    return { count: articles.count, items: articleDtos };
  },

  getAllDrafts: async (pageIndex,pageSize,userProfileId) => {
    const articles = await context.Article.findAndCountAll({
      where: { UserProfileId: userProfileId },
      order: [["CreatedTime", "DESC"]],
      include: [
        { association: "UserProfile", include: ["User"] },
        "Comments",
        "Claps",
        "Category",
      ],
      limit: pageSize == null ? 10 : pageSize,
      offset: pageIndex == null ? 0 : pageIndex,
      distinct: true,
    });

    const articleDtos = [];
    articles.rows.map((a) => {
      const articleDto = articleMapping.GetArticleDto(a);
      articleDto.userProfile = userProfileMapping.GetUserProfileDto(
        a.UserProfile
      );
      articleDto.category = categoryMapping.GetCategoryDto(a.Category);
      articleDtos.push(articleDto);
    });

    return { count: articles.count, items: articleDtos };
  },

  getAllPopulars: async (categoryId) => {
    let catCond = { IsPublished: 1 };
    if (categoryId != null && categoryId != 0) {
      catCond = { ...catCond, CategoryId: categoryId };
    }
    const articles = await context.Article.findAll({
      // where: catCond,
      include: [
        { association: "UserProfile", include: ["User"] },
        "Comments",
        "Claps",
        "Category",
      ],
      order: [["viewCount", "DESC"]],
      limit: 5,
      offset: 0
    });

    const articleDtos = [];
    articles.map((a) => {
      const articleDto = articleMapping.GetArticleDto(a);
      articleDto.userProfile = userProfileMapping.GetUserProfileDto(
        a.UserProfile
      );
      articleDto.category = categoryMapping.GetCategoryDto(a.Category);
      articleDtos.push(articleDto);
    });

    return articleDtos;
  },

  getAllByUser: async (pageIndex,pageSize,userProfileId) => {
    const articles = await context.Article.findAndCountAll({
      where: { UserProfileId: req.query.userProfileId, IsPublished: 1 },
      order: [["CreatedTime", "DESC"]],
      include: [
        { association: "UserProfile", include: ["User"] },
        "Comments",
        "Claps",
        "Category",
      ],
      limit: pageSize == null ? 10 : pageSize,
      offset: pageIndex == null ? 0 : pageIndex,
      distinct: true,
    });

    const articleDtos = [];
    articles.rows.map((a) => {
      const articleDto = articleMapping.GetArticleDto(a);
      articleDto.userProfile = userProfileMapping.GetUserProfileDto(
        a.UserProfile
      );
      articleDto.category = categoryMapping.GetCategoryDto(a.Category);
      articleDtos.push(articleDto);
    });

    return  { count: articles.count, items: articleDtos };
  },

  update: async (id,data) => {
    const affectedRows = await context.Article.update(data, {
      where: {
        Id: id,
      },
    });
    if (affectedRows == 0) throw new NotfoundError()
  },
};
