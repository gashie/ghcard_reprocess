$("#submit").click(function () {
  var did = $("#did").val();
  if (did == "") {
    $("#loader").hide();

    swal({
      icon: "error",
      title: "Oops...",
      text: "Field cannot be empty!",
      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/apps/tbills/customer";

    // $('#loader').hide();
    $.ajax({
      url: url,
      method: "POST",
      async: true,
      dataType: "json",
      crossDomain: true,
      cache: false,
      headers: {
        "Content-Type": "application/json",
      },

      data: JSON.stringify({
        did: did,
      }),
      beforeSend: function () {
        $("#loader").show();
      },

      success: function (res) {
        console.log(res);
        // If table is initialized
        if ($.fn.DataTable.isDataTable("#simpletable")) {
          // Destroy existing table
          $("#simpletable").DataTable().destroy();
        }
        $("#custable").show();
        $.each(res, function (i, item) {
          //   $.each(this, function (k, v) {
          //       console.log(v);
          $("#simpletable").dataTable().fnDestroy();

          var mytable = $("#simpletable").DataTable({
            paging: true,
            lengthChange: true,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            sDom: "lfrtip",
          });
          mytable.row.add([
            item.id,
            `<td><a href="investment.html?prefix=${item.client_prefix}"><span class="badge badge-success">${item.client_prefix}</span></a></td>`,
            item.client_suffix,
            item.title,
            item.initials,
            item.surname,
            item.other_names,
            item.accountnumber,
            `<td><div class="btn-group mb-2 mr-2 ">
            <button class="btn drp-icon btn-rounded btn-info dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="feather icon-info"></i></button>
            <div class="dropdown-menu">
                <a href="/apps/tbills/advices/${item.client_prefix}" class="dropdown-item">List Advices</a>
            </div>
        </div></td>`,
          ]);
          mytable.draw();

          // $('#simpletable').append(
          //   '<tbody>' +
          //     '<tr>' +
          //     '<td>' +
          //     item.DATE +
          //     '</td>' +
          //     '<td>' +
          //     v.AMOUNT +
          //     '</td>' +
          //     '<td><span class="badge bg-inverse-info">' +
          //     v.STATUS +
          //     '</td>' +
          //     '</tr>' +
          //     '</tbody>'
          // );
          // $('#simpletable').DataTable();
        });
        // });

        $("#loader").hide();
        $("form").trigger("reset");
      },
      error: function (xhr, status, error) {
        $("#loader").hide();

        if (xhr.readyState == 4) {
          // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
          console.log(xhr);
          var err = xhr.responseText;

          $("form").trigger("reset");
          swal({
            icon: "error",
            title: "Ooops...",
            text: err.error,
            footer: "<a href>Why do I have this issue?</a>",
          }).then((value) => {
            window.location.replace("/");
          });
        } else if (xhr.readyState == 0) {
          // Network error (i.e. connection refused, access denied due to CORS, etc.)

          $("form").trigger("reset");
          swal({
            icon: "error",
            title: "Ooops...",
            text: "Network error (i.e. connection refused, access denied due to CORS, etc.)",
            footer: "<a href>Why do I have this issue?</a>",
          }).then((value) => {
            window.location.replace("/");
          });
        } else {
          // something weird is happening
          $("form").trigger("reset");
          swal({
            icon: "error",
            title: "Ooops...",
            text: "something weird is happening",
            footer: "<a href>Why do I have this issue?</a>",
          }).then((value) => {
            window.location.replace("/");
          });
        }
      },
    });
  }
});
