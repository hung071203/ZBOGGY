const {readdirSync} = require("fs");
const path = require('path');

module.exports = () => {
    const client = global.client
    const eventPath = path.join(__dirname, '..','modules', 'events');
    const eventFile = readdirSync(eventPath).filter(File => File.endsWith('.js'));
    var eventCount = 0,
        onloadCount = 0,
        anyEventCount = 0;

    for (const File of eventFile) {
        delete require.cache[require.resolve(path.join(eventPath, File))];
        const event = require(path.join(eventPath, File));
        if(!event.config.name) return

        if(event.run){
            client.events.set(event.config.name, event)
            eventCount++
        }


        if(event.onload){
            onloadCount++
        }

        if(event.anyEvent){
            anyEventCount++
        }

    }
    console.log('Đã load thành công '+ eventCount + 'events, ' + onloadCount + ' lệnh onload, ' + anyEventCount + ' lệnh anyEvent.')
}