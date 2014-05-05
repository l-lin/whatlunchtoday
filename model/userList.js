UserList = new Meteor.Collection2('userList', {
    schema : new SimpleSchema({
        name: {
            type: String
        },
        groupName: {
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
            UserList.insert({name: userName, groupName: 'whatlunchtoday'});
        }
    },
    unregister: function() {
        localStorage.removeItem(UserList.KEY);
    },
    getKey: function() {
        return localStorage.getItem(UserList.KEY)
    }
};

Meteor.methods({
    searchUser: function(query, options) {
        options = options || {};

        // guard against client-side DOS: hard limit to 50
        if (options.limit) {
            options.limit = Math.min(50, Math.abs(options.limit));
        } else {
            options.limit = 50;
        }

        // TODO fix regexp to support multiple tokens
        var regex = new RegExp('^' + query);
        return UserList.find({name: {$regex:  regex}}, options).fetch();
    }
});
