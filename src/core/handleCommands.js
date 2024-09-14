const {readdirSync} = require("fs");
const path = require('path');

module.exports = () => {
    const client = global.client
    const commandPath = path.join(__dirname, '..','modules', 'commands');
    const commandFile = readdirSync(commandPath).filter(File => File.endsWith('.js'));
    var commandCount = 0,
        replyCount = 0,
        noprefixCount = 0,
        onloadCount = 0,
        anyEventCount = 0;
    for (const File of commandFile) {
        delete require.cache[require.resolve(path.join(commandPath, File))];
        const command = require(path.join(commandPath, File));
        if(!command.config.name) return

        if(command.run){
            client.commands.set(command.config.name, command)
            commandCount++
        }

        if(command.noprefix){
            noprefixCount++
        }

        if(command.onload){
            onloadCount++
        }

        if(command.handleReply){replyCount++}

        if(command.anyEvent){
            anyEventCount++
        }

    }
    console.log('Đã load thành công '+ commandCount + 'lệnh, '+ replyCount + ' lệnh reply, ' + noprefixCount + ' lệnh không prefix, ' + onloadCount + ' lệnh onload, ' + anyEventCount + ' lệnh anyEvent.')
}