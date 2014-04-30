Template.login.events({
    'submit': function() {
        var $userName = $('.wlt-login-form').find('input[name="userName"]'),
            userName = $userName.val();
        if (userName) {
            UserList.currentUser.save();
            Router.go('groupList');
        }
        return false;
    }
});
