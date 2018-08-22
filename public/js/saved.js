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
            method:"GET",
            url: `/articles/${articleID}`,
            
        })
    })
});