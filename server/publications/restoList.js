Meteor.publish('restoList', function () {
    return RestoList.find();
});

Meteor.publish('resto', function(restoName) {
    return RestoList.find({name: restoName});
});

Meteor.publish('searchResto', function(groupName, restoNameRegex) {
    return RestoList.find({groupName: groupName, name: restoNameRegex});
});
