<table class="table table-striped table-hover ">
  <thead>
    <tr>
      <th>Place</th>
      <th>Player</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
    @for($i = 0; $i < count($leaderboard); $i++)
      <tr>
        <td>{{ $i + 1 }}</td>
        <td>{{ $leaderboard[$i]['player_name'] }}</td>
        <td align="center">{{ $leaderboard[$i]['total'] }}</td>
      </tr>
    @endfor
  </tbody>
</table>
<div class="text-center date-stamp">
      <span >Last Updated: {{ date('Y-m-d H:i:s') }} EST</span>
</div>