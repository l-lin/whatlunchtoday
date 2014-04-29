var LoginController = RouteController.extend({
    template: 'login'
});

Router.map(function () {
    this.route('login', {
        path :  '/login',
        controller :  LoginController
    });
});