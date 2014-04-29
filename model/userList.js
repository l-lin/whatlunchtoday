UserList = new Meteor.Collection2('userList', {
    schema : new SimpleSchema({
        name: {
            type: String
        }
    })
});

// Collection2 already does schema checking
// Add custom permission rules if needed
UserList.allow({
    insert : function () {
        return true;
    },
    update : function () {
        return true;
    },
    remove : function () {
        return false;
    }
});

