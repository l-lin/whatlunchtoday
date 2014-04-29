Meteor.publish('restoList', function () {
    return RestoList.find();
});

