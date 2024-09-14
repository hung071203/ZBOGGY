const path = require('path');

module.exports.config = {
  name: "test",
  version: "1.0.0",
  credits: "Hung dep trai",
  description: "Upscale hình ảnh",
  tag: "AI",
  usage: "4k rep hình muốn upscale",
  countDown: 700,
  role: 3,
};

module.exports.run = async function (api, event, args) {
    api.sendMessage(
        {
            msg: "dshgfushd",
            attachments: [path.join(global.client.mainPath, 'src', 'saveFolder', "cat.jpg")],
        },
        event.threadId,
        event.type
    )
        .then(console.log)
        .catch(console.error);
};

module.exports.noprefix = async function (api, event, args) {
    api.sendMessage({
        msg: "ok",
        quote: event
    }, event.threadId, event.type);
}
