Meteor.publish('groupList', function () {
    return GroupList.find();
});

Meteor.publish('group', function(groupName) {
    return GroupList.find({name: groupName});
});
