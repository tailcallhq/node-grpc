const client = require("./client");

client.getAllNews({}, (error, news) => {
    if (error) {
        console.error("Error: ", error);
        return;
    }
    console.log("All news: ", news);
});
