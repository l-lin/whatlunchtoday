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

GroupList.KEY = 'groupName';
GroupList.currentGroup = {
    get: function() {
        return GroupList.findOne({name: this.getKey()});
    },
    save: function(groupName) {
        localStorage.setItem(GroupList.KEY, groupName);
        var group = this.get();
        if (!group) {
            GroupList.insert({name: this.getKey()});
        }
    },
    remove: function() {
        localStorage.removeItem(GroupList.KEY);
    },
    getKey: function() {
        return localStorage.getItem(GroupList.KEY)
    }
};
