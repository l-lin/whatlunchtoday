var HomeController = RouteController.extend({
    template: 'home'
});

Router.map(function () {
    this.route('home', {
        path :  '/',
        controller :  HomeController,
        waitOn: function() {
            return Meteor.subscribe('userList');
        },
        data: function() {
            return {
                currentUser: UserList.currentUser.get(),
                currentGroup: GroupList.currentGroup.get()
            };
        }
    });
});
