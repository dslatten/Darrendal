define(['durandal/app', 'durandal/system', 'durandal/viewLocator', 'durandal/plugins/router', 'jquery'],
function (app, system, viewLocator, router, $) {

    system.debug(true);
    app.title = 'Durandal Samples';
    app.start().then(function () {
        viewLocator.useConvention('app/viewmodels', 'app/views');
        app.adaptToDevice();
        app.setRoot('app/samples/shell');
    });
});