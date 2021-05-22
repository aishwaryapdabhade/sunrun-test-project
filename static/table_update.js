



$( document ).ready(function() {
    console.log( "Loaded" );
});


window.onload = function (){
    console.log( "ReLoaded" );
    $.get( "http://127.0.0.1:5000/get_table_data", function( data ) {
            console.log('Received data')
            updateTable("board",['destination','arrival_time','departure_time','route'], data['data'])
            });
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