const UserProfileService = require('../../WeSociety.Application/Services/UserProfile.service')

module.exports = {
    getById: UserProfileService.getById,
    update: UserProfileService.update
}