var userHandle = Meteor.subscribe('user', {name: localStorage.getItem('userName')});
Template.login.show = function() {
    return !userHandle.ready();
};

Template.login.events({
    'submit': function() {
        var $userName = $('.wlt-login-form').find('input[name="userName"]'),
            userName = $userName.val();
        if (userName) {
            localStorage.setItem('userName', userName);
            var me = user();
            if (!me) {
                UserList.insert({name: userName});
            }
        }
        return false;
    }
});

Template.login.userList = function() {
    return UserList.find();
};
