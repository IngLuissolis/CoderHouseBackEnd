export default class UsersRespDTO {
    constructor(user) {
        this.firstName = user.first_name,
        this.userRole = user.role
    }
}