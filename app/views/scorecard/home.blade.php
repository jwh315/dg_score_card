@extends('master')
@section('content')
	<a href="{{url('start-match/')}}" data-role="button">Start A Match</a>
	<a href="#" data-role="button">Join Existing Match</a>
	<a href="{{url('score/')}}" data-role="button">Play!</a>
@stop
