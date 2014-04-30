Meteor.publish('groupList', function () {
    return GroupList.find();
});
