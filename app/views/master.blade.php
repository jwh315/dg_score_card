<!doctype html>
<html>
<head>
    <title>PVDGC League Score Card</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css">
    <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
    <link rel="stylesheet" href="{{asset('css/custom.css')}}">
</head>
<body>
    <div data-role="page">

        <div data-role="header" data-position="fixed">
            <h1 class="main-header" >PVDGC Score Card</h1>
        </div>

        <div data-role="content">
            @yield('content')
        </div>

        <div data-role="footer" data-position="fixed">
            <h4><a href="{{url('/')}}">Home</a></h4>
        </div>
    </div>
</body>
</html>