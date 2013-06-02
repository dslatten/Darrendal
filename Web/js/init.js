/* ========================================================================== *\
    Everything in this file is wrapped in an anonymous immediately-invoked 
    function expression and it executes within the context of the host 
    page's <head> element on the initial pass. Therefore, if you add your 
    own code here, do not reference DOM elements in the <body>, because they 
    probably haven't been parsed yet and you'll get an error. 
\* ========================================================================== */
(function() {

    /* ------------------------------------------------------------------ *\
        RequireJS configuration
        http://requirejs.org/docs/api.html#config
    \* ------------------------------------------------------------------ */
    require = {
        enforceDefine: false,
        baseUrl: './',
        paths: {
            durandal: [
                'lib/durandal'
            ],
            jquery: [
                'lib/jquery/jquery-1.10.1.min'
            ],
            knockout: [
                'lib/knockout/knockout-2.2.1'
            ],
            text: [
                'lib/require-text/text-2.0.6'
            ],
            samples: [ // Your app's module ID
                'app/samples' // Your app's path
            ]
        },
        shim: {
            'jquery': {
                exports: '$'
            },
            'knockout': {
                exports: 'ko'
            }
        }
    };

    /* ------------------------------------------------------------------ *\
        This callback function dynamically loads require.js, which then 
        initiates the application specified by the data-main attribute.
    \* ------------------------------------------------------------------ */
    var loadApp = function() {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'lib/require/require-2.1.6.min.js';
        // This points to your application's main.js file (note the ".js" is omitted)
        s.setAttribute('data-main', 'app/main');
        document.getElementsByTagName('head')[0].appendChild(s);
    }

    /* ------------------------------------------------------------------ *\
        Here we attach loadApp() to the host page's onload event, making 
        sure not to overwrite any functions that might already be 
        attached to it.
    \* ------------------------------------------------------------------ */
    var oldOnload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = function() {
            loadApp();
        }
    }
    else {
        window.onload = function() {
            if (oldOnload) {
                oldOnload();
            }
            loadApp();
        }
    }

}());