

var refreshTime = 10000;

$( document ).ready(function() {
    console.log( "Loaded" );
    getData();
});


let clock = () => {
  let date = new Date();
  let hrs = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();
  let period = "AM";
  if (hrs == 0) {
    hrs = 12;
  } else if (hrs >= 12) {
    hrs = hrs - 12;
    period = "PM";
  }
  hrs = hrs < 10 ? "0" + hrs : hrs;
  mins = mins < 10 ? "0" + mins : mins;
  secs = secs < 10 ? "0" + secs : secs;

  let time = `${hrs}:${mins}:${secs}:${period}`;
  setInterval(clock, 1000);
  document.getElementById("clock").innerText = time;
};

clock();

function getData(){
        
        $.get( "http://127.0.0.1:5000/get_table_data", function( data ) {
            console.log('Received data')
            updateTable("board",['destination','arrival_time','departure_time','route'], data['data'])
            });
        setInterval(getData, refreshTime);
    }




function updateTable(tableId, fields, data) {
    
    console.log('Exec update table')
    $('#' + tableId).empty();
    var rows = '';
    $.each(data, function(index, item) {
        var row = '<tr>';
        $.each(fields, function(index, field) {
            row += '<td>' + item[field+''] + '</td>';
        });
        rows += row + '<tr>';
    });
    headers = `<thead>
                    <tr>
                    <th scope="col">DESTINATION</th>
                    <th scope="col">ARRIVAL TIME</th>
                    <th scope="col">DEPARTURE TIME</th>
                    <th scope="col">ROUTE</th>
                    </tr>
                </thead >`;
    rows = "<tbody>" + rows + "<\tbody>"
    $('#' + tableId).html(headers + rows);
}