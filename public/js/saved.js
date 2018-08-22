//JavaScript for the saved page
$(()=>{
    //Grab saved articles as JSON
    $.getJSON("/saved-articles",(articleData)=>{
        //console.log(articleData);
        articleData.forEach(element => {
            let card = $(`<div class="card mb-3">`);
            let cardHeader = $(`<div class="card-header bg-primary">`);
            cardHeader.append(`
                <h5>
                    <a class="article-link" target="_blank" rel="noopener noreferre" href="${element.link}">${element.title}</a>
                    <button class='btn btn-info btn-sm card-btn add-note' data-id='${element._id}'>ARTICLE NOTES</button>
                    <button class='btn btn-danger btn-sm card-btn rm-save' data-id='${element._id}'>DELETE FROM SAVED</button>
                </h5>`
            );
            let cardBody = $(`<div class="card-body bg-light">`);
            cardBody.append(`<p class="card-text">${element.summary}</p>`);
            card.append(cardHeader);
            card.append(cardBody);
            $("#articles").append(card);
        });
    });

    //onClick for removing article form saved
    $("#articles").on("click",".rm-save", function(){
        $(this).parent().parent().parent().remove();
        let articleID = $(this).data('id');
        console.log(articleID);
        $.ajax({
            method: "PUT",
            url: `/articles/${articleID}`,
            data: {
                isSaved: false,
            }
        });
    });

    //button to toggle model to add note
    $("#articles").on("click",".add-note", function(){
        let articleID = $(this).data('id');
        //console.log(articleID);
        $("#noteID").text(articleID);
        //ajax call to display note
        $.ajax({
            method:"GET",
            url: `/articles/${articleID}`,
        }).then((data)=>{
            //clear note-container for repopulate
            $(".note-container").empty();
            //if note exist populate it
            if(data.note && data.note.length){
                console.log(data.note);
                data.note.forEach(element =>{
                    $(".note-container").append(`
                        <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${element._id}">
                            ${element.body}
                            <button class="btn btn-danger btn-sm card-btn rm-note">X</button>
                        </li>`
                    ); 
                });
            }
        })

        $("#note-modal").modal("toggle");
    });

    //onClick for submiting note
    $(".form-group").on("click","#save-note", function(e){
        e.preventDefault();
        let articleID = $("#noteID").text();
        let note = {
            body: $("#note-text").val()
        }
        //ajax call to create note
        $.ajax({
            method:"POST",
            url: `/articles/${articleID}`,
            data: note
        }).then((response)=>{
            console.log(response);
        });
    });

    //onClick for removing note
    $(".note-container").on("click", ".rm-note", function(){
        let noteID = $(this).parent().data('id');
        $(this).parent().remove();

        //ajax call to remove note
        $.ajax({
            method: "DELETE",
            url: `/note/${noteID}`
        })
    });
});