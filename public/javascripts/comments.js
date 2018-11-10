$(document).ready(function () {
    $("#postComment").click(function () {
        var myobj = { name: $("#name").val(), comment: $("#comment").val() };
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function (data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });
    $('#deleteComments').click(function() {
        $.ajax({
            url: 'comment',
            type: "DELETE",
            success: function (data, textStatus) {
                $("#comments").html('');
            }
        })
    })

    $("#getComments").click(function () {
        $.getJSON('comment', function (data) {
            console.log(data);
            var everything = "<ul>";
            for (var comment in data) {
                com = data[comment];
                everything += "<li> name: " + com.name + " -- comment: " + com.comment + "</li>";
            }
            everything += "</ul>";
            $("#comments").html(everything);
        })
    })
});

