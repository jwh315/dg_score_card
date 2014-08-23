<div class="container">
	<div class="row">
		<div class="col-xs-1"></div>
		<div class="col-xs-10">
			<div class="list-group">
				<a href="#" class="list-group-item active text-center">Active Matches</a>
				@foreach($matches as $match)
					<a href="#" id="{{{$match->id}}}" class="list-group-item text-center existing-matches">{{{$match->match_name}}}</a>
				@endforeach
			</div>
		</div>
		<div class="col-xs-1"></div>
	</div>
</div>

<div class="modal delete-match-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close close-modal" data-dismiss="modal" aria-hidden="true" onclick="Match.closeDeleteModal();">×</button>
                <h4 class="modal-title">Confirm Delete</h4>
            </div>
            <div class="modal-body">
                <p class='msg'>Are you sure you want to delete this match?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default delete-match" data-dismiss="modal" onclick="Match.deleteMatch();">Delete</button>
                <button type="button" class="btn btn-default cancel-modal" data-dismiss="modal" onclick="Match.closeDeleteModal();">Cancel</button>
            </div>
        </div>
    </div>
</div>
