RestoList = new Meteor.Collection2('restoList', {
    schema : new SimpleSchema({
        name: {
            type: String
        },
        score: {
            type: Number
        }
    })
});

// Collection2 already does schema checking
// Add custom permission rules if needed
RestoList.allow({
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
