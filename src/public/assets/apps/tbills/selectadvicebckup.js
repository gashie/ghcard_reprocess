// var $rows = [];
// var mybox = [];
// var data_to_show = '';
// $(function () {
//   // start plugin
//   $("#simpletable").TableSelection(
//     {
//       sort: true, // sort or not (true | false)
//       status: "multiple", // single or multiple selection (default is 'single')
//     },
//     function (obj) {
//       // callback function return selected rows array
//       $rows = obj.rows;
//     }
//   );
// });

// // Get HTML Object from row in array
// function showSelectedRow(array) {
//   $("#info").empty();
//   $.each(array, function (i, row) {
//     // console.log([
//     //     {
//     //       tender: $("#simpletable").RowValue(row).find("td").eq(2).html(),
//     //       id: $("#simpletable").RowValue(row).find("td").eq(0).html(),
//     //       did: $("#simpletable").RowValue(row).find("td").eq(3).html(),
//     //     },
//     //   ]);
//     mybox.push(
//       {
//         tender: $("#simpletable").RowValue(row).find("td").eq(2).html(),
//         id: $("#simpletable").RowValue(row).find("td").eq(0).html(),
//         did: $("#simpletable").RowValue(row).find("td").eq(3).html(),
//       },
//     );
//   });
//   let url = "/apps/tbills/invoice";

//   // $('#loader').hide();
//   $.ajax({
//     url: url,
//     method: "POST",
//     async: true,
//     dataType: "json",
//     crossDomain: true,
//     cache: false,
//     headers: {
//       "Content-Type": "application/json",
//     },

//     data: JSON.stringify(mybox),
//     beforeSend: function () {
//       $("#loader").show();
//     },

//     success: function (res) {
//         console.log('success');
// 		 $('body').html(res);
//     },
//     error: function (xhr, status, error) {
//       $("#loader").hide();

//       if (xhr.readyState == 4) {
//         // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
//         console.log(xhr);
//         var err = xhr.responseText;

//         $("form").trigger("reset");
//         swal({
//           icon: "error",
//           title: "Ooops...",
//           text: err.error,
//           footer: "<a href>Why do I have this issue?</a>",
//         }).then((value) => {
//           window.location.replace("/");
//         });
//       } else if (xhr.readyState == 0) {
//         // Network error (i.e. connection refused, access denied due to CORS, etc.)

//         $("form").trigger("reset");
//         swal({
//           icon: "error",
//           title: "Ooops...",
//           text: "Network error (i.e. connection refused, access denied due to CORS, etc.)",
//           footer: "<a href>Why do I have this issue?</a>",
//         }).then((value) => {
//           window.location.replace("/");
//         });
//       } else {
//         // something weird is happening
//         $("form").trigger("reset");
//         swal({
//           icon: "error",
//           title: "Ooops...",
//           text: "something weird is happening",
//           footer: "<a href>Why do I have this issue?</a>",
//         }).then((value) => {
//           window.location.replace("/");
//         });
//       }
//     },
//   });

// }
// var bigData = []
// $(document).ready(function() {
//     console.log('OKKKKK');
//     var oTable = $('#simpletable').DataTable();

//     $('#simpletable tbody').on( 'click', 'tr', function () {
//         $(this).toggleClass('selected');
//         var pos = oTable.row(this).index();
//         var row = oTable.row(pos).data();
//         var oData = oTable.rows('.selected').data();

//         for (var i=0; i < oData.length ;i++){
//         //    console.log("tender: " + oData[i][0] + " Position: " + oData[i][1] + " Office: " + oData[i][2]);
//           bigData.push({tender:oData[i][2],id:oData[i][0],did:oData[i][3]})
//           document.getElementById('mydata').value=(JSON.stringify({tender:oData[i][2],id:oData[i][0],did:oData[i][3]}))
//         }
//         console.log(bigData);
//         document.getElementById('mydata').value=(JSON.stringify(bigData))
//     } );

//     $('#button').click( function () {
//         var oData = oTable.rows('.selected').data();

//         for (var i=0; i < oData.length ;i++){
//            alert("Name: " + oData[i][0] + " Position: " + oData[i][1] + " Office: " + oData[i][2]);
//         }

//     } );
// } );

$(function () {
  //If check_all checked then check all table rows
  $('#check_all').on('click', function () {
    if ($('input:checkbox').prop('checked')) {
      $("input:checkbox[name='row-check']").prop('checked', true);
    } else {
      $("input:checkbox[name='row-check']").prop('checked', false);
    }
  });

  // Check each table row checkbox
  $("input:checkbox[name='row-check']").on('change', function () {
    var total_check_boxes = $("input:checkbox[name='row-check']").length;
    var total_checked_boxes = $(
      "input:checkbox[name='row-check']:checked"
    ).length;

    // If all checked manually then check check_all checkbox
    if (total_check_boxes === total_checked_boxes) {
      $('#check_all').prop('checked', true);
    } else {
      $('#check_all').prop('checked', false);
    }
  });
});
function GetSelected() {
  //Reference the Table.
  var grid = document.getElementById('simpletable');

  //Reference the CheckBoxes in Table.
  var checkBoxes = grid.getElementsByTagName('INPUT');
  var message = 'Id Name                  Country\n';

  //Loop through the CheckBoxes.
  for (var i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      var row = checkBoxes[i].parentNode.parentNode;
      message += row.cells[1].innerHTML;
      message += '   ' + row.cells[2].innerHTML;
      message += '   ' + row.cells[3].innerHTML;
      message += '\n';
    }
  }

  //Display selected Row data in Alert Box.
  alert(message);
}
