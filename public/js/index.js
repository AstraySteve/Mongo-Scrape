//JavaScript for the home page
$(()=>{
    console.log("Hello World");
    //Grab articles as JSON
    $.getJSON("/articles",(articleData)=>{
        //console.log(articleData);
        articleData.forEach(element => {
            let card = $(`<div class="card mb-3">`);
            let cardHeader = $(`<div class="card-header bg-primary">`);
            cardHeader.append(`
                <h5>
                    <a class="article-link" target="_blank" rel="noopener noreferre" href="${element.link}">${element.title}</a>
                    <button class='btn btn-success btn-sm save' data-id='${element._id}'>SAVE ARTICLE</button>
                </h5>`
            );
            let cardBody = $(`<div class="card-body bg-light">`);
            cardBody.append(`<p class="card-text">${element.summary}</p>`);
            card.append(cardHeader);
            card.append(cardBody);
            $("#articles").append(card);
        });
    });

    //onClick lisitener for scrape
    $(".navbar").on("click", "#scrape-new", ()=>{
        $.ajax({
            method: "GET",
            url: "/scrape",
        }).then((result)=>{
            if(result){
                location.reload();
            }
            else{
                console.log("Failed to Scrape");
            }
        });
    });

    //onClick for saved articles
    $("#articles").on("click", ".save", function(){
        console.log($(this).data('id'));
    });
});
