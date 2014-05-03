Meteor.publish('voteList', function () {
    return VoteList.find();
});

Meteor.publish('voteByGroupName', function (groupName, date) {
    return VoteList.find({groupName: groupName, date: date});
});
