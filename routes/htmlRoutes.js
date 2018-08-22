//HTML ROUTES
module.exports =(app)=>{
    //home page
    app.get("/",(req, res)=>{
        res.render("index",{
            title: "Mongo Scraper",
            subTitle: "MyAnimeList News Edition",
            customScript: '/js/index.js'
        });
    });

    //saved page
    app.get("/saved",(req,res)=>{
        res.render("index",{
            title: "Saved Articles",
            subTitle: "Your Saved Articles",
            customScript: '/js/saved.js'
        });
    });
};