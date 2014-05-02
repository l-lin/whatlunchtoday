var GroupListController = RouteController.extend({
    template: 'groupList'
});

Router.map(function () {
    this.route('groupList', {
        path: '/group',
        controller: GroupListController,
        waitOn: function () {
            return [
                Meteor.subscribe('groupList'),
                Meteor.subscribe('group')
            ];
        },
        data: function () {
            return {
                step: 'GROUP',
                currentUser: UserList.currentUser.get()
            };
        }
    });
});
