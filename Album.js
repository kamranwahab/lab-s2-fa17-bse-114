$(function () {
    loadAlbums();
    $("#albums").on("click", ".btn-outline-danger", handleDelete);
    $("#albums").on("click", ".btn-outline-warning", handleUpdate);
    $("#addBtn").click(addAlbum);
    $("#updateSave").click(Update);
});

function Update() {
    var id = $("#updateId").val();
    var title = $("#updateTitle").val();

    if (title.length < 1) {
        $("#nameHelp").css("color", "red");
        return;
    }
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/albums/" + id,
        data: { title },
        method: "PUT",
        success: function (response) {
            console.log(response);
            loadAlbums();
            $("#updateModal").modal("hide");
            $("#updateHelpId").css("color", "grey");
        },
    });
}
function handleUpdate() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.get(
        "https://jsonplaceholder.typicode.com/albums/" + id,
        function (response) {
            $("#updateId").val(response.id);
            $("#updateTitle").val(response.title);
            $("#updateModal").modal("show");
        }
    );
}
function addAlbum() {
    var title = $("#title").val();

    if (title.length < 1) {
        $("#titleHelp").css("color", "red");
        return;
    }
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/albums",
        method: "POST",
        data: { title },
        success: function (response) {
            console.log(response);
            $("#title").val("");

            loadAlbums();
            $("#addModal").modal("hide");
            $("#titleHelp").css("color", "grey");
        },
    });
}
function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/albums/" + id,
        method: "DELETE",
        success: function () {
            loadAlbums();
        },
    });
}
function loadAlbums() {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/albums",
        method: "GET",
        error: function (response) {
            var albums = $("#albums");
            albums.html("An Error has occured");
        },
        success: function (response) {
            console.log(response);
            var albums = $("#albums");
            albums.empty();
            for (var i = 0; i < response.length; i++) {
                var rec = response[i];
                albums.append(
                    `<div class="recipe" data-id="${rec.id}"><h3>(${rec.id}) - ${rec.title}</h3><p><button class="btn btn-outline-danger btn-sm float-right">delete</button><button class="btn btn-outline-warning btn-sm float-right">Edit</button></p><br></div>`
                );
                // albums.append("<div><h3>" + rec.title + "</h3></div>");
            }
        },
    });
}