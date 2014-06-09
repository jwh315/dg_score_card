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
    <script>
        var base_url = "{{url('/')}}"
    </script>
    <script src="{{asset('js/bootstrap-without-jquery.js')}}"></script>
    <script src="{{asset('js/main.js')}}"></script>
</body>
</html>