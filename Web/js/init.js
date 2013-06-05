(function() {

    /* ------------------------------------------------------------------ *\
        RequireJS configuration
        http://requirejs.org/docs/api.html#config
    \* ------------------------------------------------------------------ */
    require = {
        
        /* ---------------------------------------------------------- *\
            enforceDefine
            http://requirejs.org/docs/api.html#config-enforceDefine
        \* ---------------------------------------------------------- */
        enforceDefine: true,

        /* ---------------------------------------------------------- *\
            baseUrl
            http://requirejs.org/docs/api.html#config-baseUrl

            The baseUrl determines the root path to use for looking
            up modules on the local file system. Module locations
            specified by the `paths` configuration (see below) are
            defined relative to the baseUrl location.

            The baseUrl is *not* used for looking up plain (non-AMD)
            JavaScript files or externally-hosted dependencies
            (dependency identifiers that begin with "/", have a
            protocol, or end in ".js"), which are instead looked up
            relative to the page that loads require.js (in our case,
            that would be /index.html).

            If the baseUrl is not set, it defaults to the path
            specified by the `data-main` attribute of the <script>
            tag that loads require.js. If that attribute isn't set,
            baseUrl defaults to the location of the page that loads
            require.js.
        \* ---------------------------------------------------------- */
        baseUrl: './',

        /* ---------------------------------------------------------- *\
            paths
            http://requirejs.org/docs/api.html#config-paths

            By default, require.js will look for modules in the
            baseUrl directory. If your module files are not stored
            directly inside that folder, you can use `paths` to tell
            require.js where to find them.

            Each path has two parts: a name and a location.

            In most cases, the name corresponds to a module ID, and
            the location represents a relative path from the baseUrl
            to that module (with no file extension). In other cases,
            the name refers to the directory component of a module
            ID, and the location represents a relative path from the
            baseUrl to that directory.

            Locations can also be absolute paths (if they start with
            "/") or URLs (if they include a protocol, like "http:").
        \* ---------------------------------------------------------- */
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
            ],
            noconflict: [ // Keep jQuery out of the global namespace.
                'js/noconflict'
            ]
        },

        /* ---------------------------------------------------------- *\
            map
            http://requirejs.org/docs/api.html#config-map
        \* ---------------------------------------------------------- */
        map: {

            /* -------------------------------------------------- *\
                Any module ('*') that requires jQuery ('jquery')
                will be given the 'noconflict' module instead.
                The 'noconflict' module then requires jQuery and
                returns `$.noConflict(true)`. This allows the
                app to access a private instance of jQuery
                without polluting the global namespace.
            \* -------------------------------------------------- */
            '*': {
                'jquery': 'noconflict'
            },

            /* -------------------------------------------------- *\
                This is the one exception to the previous rule.
                When other modules ask for 'jquery', they get
                'noconflict' instead. But when the 'noconflict'
                module asks for 'jquery', it gets the real
                jQuery (as defined by paths.jquery above).
            \* -------------------------------------------------- */
            'noconflict': {
                'jquery': 'jquery'
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