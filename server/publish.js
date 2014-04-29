Meteor.publish('userList', function() {
    return UserList.find();
});

Meteor.publish('user', function(name) {
    return UserList.findOne({name: name});
});

Meteor.publish('restoList', function() {
    return RestoList.find();
});
