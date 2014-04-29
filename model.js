////////// Shared code (client and server) //////////

// {name: 'foobarResto', score: ''}
RestoList = new Meteor.Collection('restoList');

// {name: 'FooBar'}
UserList = new Meteor.Collection('userList');

// {name: 'FooBarGroup'}
GroupList = new Meteor.Collection('groupList');

user = function() {
//    var userList = UserList.find();
//    userList.forEach(function(u) {
//        UserList.remove(u._id);
//    });
    return UserList.findOne({name: localStorage.getItem('userName')});
};

group = function() {
    return false;
};
