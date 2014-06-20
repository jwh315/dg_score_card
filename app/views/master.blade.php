<!doctype html>
<html>
<head>
    <title>PVDGC League Score Card</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/custom.css')}}">
</head>
<body>

    <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
            <a href="#" onclick="App.home();" class="navbar-brand">PVDGC Score Card</a>
        </div>
    </nav>
    <div id="content">
        @yield('content')
    </div>

    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close close-modal" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">Whoops and junk</h4>
                </div>
                <div class="modal-body">
                    <p class='err-msg'></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default close-modal" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script src="{{asset('js/bootstrap-without-jquery.js')}}"></script>
    <script src="{{asset('js/main.js')}}"></script>
</body>
</html>