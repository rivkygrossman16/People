﻿$(() => {

    loadPeople();

    function loadPeople() {
        $.get('/people/getall', function (people) {
            $("#people-table tr:gt(0)").remove();
            people.forEach(person => {
                $("#people-table tbody").append(`
<tr>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
<td>
<a class="btn btn-success" id="edit-button" data-id=${person.id} data-first=${person.firstName} data-last=${person.lastName} data-age=${person.age} > Edit</a >
</td>
<td>
<a class="btn btn-danger" id="delete-button" data-id=${person.id}>Delete</a>
</td>
</tr>`);
            });
        });
    }

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();


        $.post('/people/addperson', { firstName, lastName, age }, function (person) {
            loadPeople();
            $("#first-name").val('');
            $("#last-name").val('');
            $("#age").val('');
        });
    });
    $("#people-table").on('click', "#delete-button", function () {
        const button = $(this);
        const id = button.data('id');

        $.post('/people/deleteperson', { id }, function (id) {
            loadPeople();


        });
    });
    $("#people-table").on('click', "#edit-button", function () {
        $(".modal").modal();
        const button = $(this);
        const id = button.data('id');
        const firstName = button.data('first');
        const lastName = button.data('last');
        const age = button.data('age');

        $("#edit-first-name").val(firstName);
        $("#edit-last-name").val(lastName);
        $("#edit-age").val(age);
        $("#edit-id").val(id);
        $("#name").text(`${firstName} ${lastName}`);

        $("#btn-save").on('click', function () {
            const firstName = $("#edit-first-name").val();
            const lastName = $("#edit-last-name").val();
            const age = $("#edit-age").val();
            const id = $("#edit-id").val();

            $.post('/people/edit', { firstName, lastName, age, id }, function (person) {
                loadPeople();
            });
            $(".modal").modal('hide');
        });
    });
    });