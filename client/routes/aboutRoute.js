var AboutController = RouteController.extend({
    template: 'about'
});

Router.map(function () {
    this.route('about', {
        path :  '/about',
        controller :  AboutController,
        data: function () {
            return {
                step: 'ABOUT'
            };
        }
    });
});

