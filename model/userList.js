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

UserList.KEY = 'userName';
UserList.currentUser = {
    get: function() {
        return UserList.findOne({name: this.getKey()});
    },
    register: function(userName) {
        localStorage.setItem(UserList.KEY, userName);
        var user = this.get();
        if (!user) {
            UserList.insert({name: userName});
        }
    },
    remove: function() {
        localStorage.removeItem(UserList.KEY);
    },
    getKey: function() {
        return localStorage.getItem(UserList.KEY)
    }
};
