//HTML ROUTES
module.exports =(app)=>{
    //home page
    app.get("/",(req, res)=>{
        res.render("index",{customScript: '/js/index.js'});
    });
};