
module.exports = (api, zca) => {
    const {anyEvent, onLoad, handleReaction, handleReply, handleEvent, handleCommand} = require("./action")(api, zca);
    // Echo bot
    onLoad();
    api.listener.on("message", (message) => {
        console.log(message);
        anyEvent(message);
        handleCommand(message)
        if(message.quote){
            handleReply(message);
        }
    });

    api.listener.on("group_event", (data) => {
        console.log(data, '2');
        anyEvent(data);
        handleEvent(data);
    });

    api.listener.on("reaction", (reaction) => {
        console.log(reaction);
        anyEvent(reaction);
        handleReaction(reaction);
    });

    api.listener.on("undo", (undo) => {
        console.log(undo);
        anyEvent(undo);
        handleEvent(undo);
    });

    api.listener.start();
};
