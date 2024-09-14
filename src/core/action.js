module.exports = (api, zca) => {
    function anyEvent(event){
        global.client.events.forEach(eventHandler => {
            if(eventHandler.anyEvent) eventHandler.anyEvent(api, event)});
        global.client.commands.forEach(commandHandler => {
            if (commandHandler.anyEvent) commandHandler.anyEvent(api, event);
        });
    }
    
    function onLoad() {
        global.client.events.forEach(commandHandler => {
            if (commandHandler.onload) commandHandler.onload(api)
        });
        global.client.commands.forEach(commandHandler => {
            if (commandHandler.onload) commandHandler.onload(api)
        });
    }
    
    
    
    function handleReaction(event) {
        const reactionHandler = client.handleReaction.find(item => item.messageID == event.messageID);
        if (reactionHandler) client.commands.get(reactionHandler.name).handleReaction(api, event, reactionHandler);
    }
    function handleReply(event) {
        const replyHandler = client.handleReply.find(item => item.messageID == event.messageReply.messageID);
        if (replyHandler) client.commands.get(replyHandler.name).handleReply(api, event, replyHandler);
    }
    
    function handleEvent(event) {
        if(event.type != 'event') return
        client.events.forEach(eventHandler => eventHandler.run(api, event));
    }
    
    function findClosestCommand(input, commands) {
        return commands.reduce((closest, command) => {
            const distance = levenshtein.get(input, command);
            return distance < levenshtein.get(input, closest) ? command : closest;
        });
    }
    
    async function handleCommand(event) {
        if(typeof event.data.content == 'string') {
            var args = event.data.content.split(" ").filter(item => item != "");
        }else{
            var args = event.data.content.title.split(" ").filter(item => item != "");
        }
        
        const listCommands = [...global.client.commands.keys()];
        if (!args[0].startsWith('!')) {
            if(listCommands.includes(args[0].toLowerCase()) && global.client.commands.get(args[0].toLowerCase())?.noprefix){
                global.client.commands.get(args[0].toLowerCase()).noprefix(api, event, args)
            }
            return
        };
        const command = args[0].toLowerCase().slice(1);
        if (!listCommands.includes(command)) {
            const find = findClosestCommand(command, listCommands);
            return api.sendMessage(`⛔Lệnh bạn nhập không tồn tại!\n♟️Lệnh gần giống nhất là: ${find}`, event.threadID, event.messageID);
        }
        global.client.commands.get(command).run(api, event, args);
    }
    
    return {
        anyEvent,
        onLoad,
        handleReaction,
        handleReply,
        handleEvent,
        handleCommand
    }    
}

