Template.login.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        $('.wlt-login-form').find('input[name="userName"]').focus();
    }
};

Template.login.events({
    'submit': function() {
        var $userName = $('.wlt-login-form').find('input[name="userName"]'),
            userName = $userName.val();
        if (userName) {
            UserList.currentUser.register(userName);
            Router.go('groupList');
        }
        return false;
    }
});
