const context = require("../../WeSociety.Persistence/context/dbContext");
const { NotfoundError } = require("../errors/errorResponse");
const followRelMapping = require("../mappings/followRelationship.mapping");

module.exports = {
  getAllFollowers: async (pageIndex, pageSize, userProfileId) => {
    const followers = await context.FollowRelationship.findAndCountAll({
      include: [{ association: "Follower", include: ["User"] }],
      where: { FollowingId: userProfileId },
      limit: pageIndex == null ? 10 : pageIndex,
      offset: pageSize == null ? 0 : pageSize,
      distinct: true,
    });

    const followerDtos = followers.rows.map((f) =>
      followRelMapping.GetFollowerDto(f)
    );
    return { count: followers.count, items: followerDtos };
  },

  getAllFollowings: async (pageIndex, pageSize, userProfileId) => {
    const followings = await context.FollowRelationship.findAndCountAll({
      include: [{ association: "Following", include: ["User"] }],
      where: { FollowerId: userProfileId },
      limit: pageIndex == null ? 10 : pageIndex,
      offset: pageSize == null ? 0 : pageSize,
      distinct: true,
    });

    const followingDtos = followings.rows.map((f) =>
      followRelMapping.GetFollowingDto(f)
    );
    return { count: followings.count, items: followingDtos };
  },

  getIsFollow: async (followerId,followingId) => {
    const isFollow = await context.FollowRelationship.findOne({
      where: {
        FollowerId: followerId,
        FollowingId: followingId
      },
    });
    if (isFollow != null) return true;
    return false;
  },

  follow: async (data) => {
    await context.FollowRelationship.create(data);
  },

  unfollow: async (data) => {
    const affectedRows = await context.FollowRelationship.destroy({
      where: {
        FollowerId: data.FollowerId,
        FollowingId: data.FollowingId,
      },
    });
    if (affectedRows == 0) new NotfoundError();
  },
};
