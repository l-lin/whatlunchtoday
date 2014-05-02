GroupList = new Meteor.Collection2('groupList', {
    schema : new SimpleSchema({
        name: {
            type: String
        }
    })
});

// Collection2 already does schema checking
// Add custom permission rules if needed
GroupList.allow({
    insert : function () {
        return true;
    },
    update : function () {
        return true;
    },
    remove : function () {
        return true;
    }
});
