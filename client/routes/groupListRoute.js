var GroupListController = RouteController.extend({
    template: 'groupList'
});

Router.map(function () {
    this.route('groupList', {
        path: '/group',
        controller: GroupListController,
        waitOn: function () {
            return [Meteor.subscribe('userList'), Meteor.subscribe('groupList'), Meteor.subscribe('restoList')];
        },
        data: function () {
            return {
                step: 'GROUP',
                currentUser: UserList.currentUser.get()
            };
        }
    });
});
