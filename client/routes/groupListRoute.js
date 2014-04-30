var GroupListController = RouteController.extend({
    template: 'groupList'
});

Router.map(function () {
    this.route('groupList', {
        path :  '/group',
        controller :  GroupListController,
        waitOn: function() {
            return Meteor.subscribe('userList');
        },
        data: function() {
            return UserList.currentUser.get();
        }
    });
});
