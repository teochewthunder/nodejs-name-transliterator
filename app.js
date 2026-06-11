var api = require("./api.js");
var express = require("express");

var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app.use(express.static("assets"));

app.get("/", (req, res)=> {
	res.render("home", { });
});

app.use(express.json());

app.post("/transliterate", async (req, res) => {

    try {

        const prompt = req.body.prompt;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required."
            });
        }

        const response = await fetch(
            "https://api.openai.com/v1/responses",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${api.key}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "gpt-5",
                    input: prompt
                })
            }
        );

        if (!response.ok) {

            const errorText = await response.text();

            return res.status(response.status).json({
                success: false,
                error: errorText
            });

        }

        const data = await response.json();

        res.json({
            success: true,
            result: data.output_text
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

app.use((req, res, next)=> {
	res.status(404);
	res.render("404");
});

app.use((err, req, res, next)=> {
	res.status(500);
	res.render("500", { errorMessage: err.code });
});

app.listen(app.get("port"), ()=> {

});
