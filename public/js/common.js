//common JS for both pages
$(()=>{
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

    //onClick for clear articles
    $(".navbar").on("click","#clear-articles",()=>{
        console.log("deleted");
        $.ajax({
            method:"DELETE",
            url:"/clearAll"
        }).then(()=>{
            //reload page
            $("#articles").empty();
        });
    });
});