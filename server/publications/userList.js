Meteor.publish('userList', function () {
    return UserList.find();
});

Meteor.publish('user', function(userName) {
    return UserList.find({name: userName});
});
