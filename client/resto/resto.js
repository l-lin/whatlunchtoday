RestoList = new Meteor.Collection('restoList');

Template.restoList.restoList = function() {
    return RestoList.find({}, {sort: {name: 1}});
};
