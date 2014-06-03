<!doctype html>
<html>
<head>
    <title>PVDGC League Score Card</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/custom.css')}}">
</head>
<body>

    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="#" onclick="home();" class="navbar-brand">PVDGC Score Card</a>
        </div>

        <div class="collapse navbar-collapse navbar-responsive-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-flag"></span>
                        Current Match
                        <span class='active-match-name'>{{Session::get('current_match')}}</span>
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="#" class="mark-match-complete">Mark as Complete</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>

    <div id="content">
        @yield('content')
    </div>
    <script>
        var base_url = "{{url('/')}}"
    </script>
    <script src="{{asset('js/bootstrap.min.js')}}"></script>
    <script src="{{asset('js/main.js')}}"></script>
</body>
</html>