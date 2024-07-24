$(document).ready(function() {
    setTimeout(function() {
        // [ Server side processing Data-table ]
        $('#dt-server-processing').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "assets/plugins/data-tables/json/dt-json-data/scripts/server-processing.php",
            "columns": [{
                    "data": "first_name"
                },
                {
                    "data": "last_name"
                },
                {
                    "data": "position"
                },
                {
                    "data": "office"
                },
                {
                    "data": "start_date"
                },
                {
                    "data": "salary"
                }
            ]
        });

        // [ Custom HTTP Variables ]
        $('#dt-http').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                url: "assets/plugins/data-tables/json/dt-json-data/scripts/server-processing.php",
                data: function(d) {
                    d.myKey = "myValue";
                    // d.custom = $('#myInput').val();
                    // etc
                }
            },
            "columns": [{
                    "data": "first_name"
                },
                {
                    "data": "last_name"
                },
                {
                    "data": "position"
                },
                {
                    "data": "office"
                },
                {
                    "data": "start_date"
                },
                {
                    "data": "salary"
                }
            ]
        });
        // <td> {{AppName}}</td>
        // <td>{{TransactionType}}</td>
        // <td> {{DateCreated}}</td>
        // <td>{{TransferAmount}}</td>
        // <td>{{TaxableAmount}}</td>
        // <td>{{ElevyAmount}}</td>
        // <td>{{ReceiverAccountNumber}}</td>
        // <td> {{SenderAccountNumber}}</td>
        // <td>{{SenderPhoneNumber}}</td>
        // <td>{{ChannelReference}}</td>
        // <td>{{TransFT}}</td>
        // <td>{{#if Status}}
        // [ POST Data ] 
        $('#dt-post').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                url: "https://elevyapi.calbankgh.com/ELevyAPI/Report/AllConfirm",
                type: "post",
                data: JSON.stringify({
                    "StartDate": new Date().toISOString().slice(0, 10),
                    "EndDate": new Date().toISOString().slice(0, 10)
                  }),
            },
            "columns": [{
                    "data": "AppName"
                },
                {
                    "data": "TransactionType"
                },
                {
                    "data": "DateCreated"
                },
                {
                    "data": "TransferAmount"
                },
                {
                    "data": "TaxableAmount"
                },
                {
                    "data": "ElevyAmount"
                },
                {
                    "data": "ReceiverAccountNumber"
                },
                {
                    "data": "SenderAccountNumber"
                },
                {
                    "data": "SenderPhoneNumber"
                },
                {
                    "data": "ChannelReference"
                },
                {
                    "data": "TransFT"
                },
                {
                    "data": "Status"
                }

            ]
        });
    }, 350);
});
