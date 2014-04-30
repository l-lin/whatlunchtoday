Meteor.publish('userList', function () {
    return UserList.find();
});
