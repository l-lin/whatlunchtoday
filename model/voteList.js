VoteList = new Meteor.Collection2('voteList', {
    schema: new SimpleSchema({
        userName: {
            type: String
        },
        groupName: {
            type: String
        },
        restoName: {
            type: String
        },
        date: {
            type: Date
        }
    })
});

// Collection2 already does schema checking
// Add custom permission rules if needed
VoteList.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});
