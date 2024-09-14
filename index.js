(async () => {
  require("dotenv").config();
  const zca = await import("zca-js");
  const { Zalo } = zca;
  const zalo = new Zalo(
    {
      cookie:
        "_ga_RYD7END4JE=GS1.2.1725029070.1.1.1725029071.59.0.0; _ga_1J0YGQPT22=GS1.1.1725971621.1.0.1725971628.53.0.0; _ga=GA1.2.1488557890.1725029070; zpsid=j84-.419954655.0.04bgZJ0yRNRlmsflF3njTaLF7q811LH310fOGqHSGbvW3QnTCUcjbrOyRNO; __zi=3000.SSZzejyD7iu_cVEzsr0LpYAPvhoKKa7GR9V-_yX0IvuWa_-xZK5EaIoJjxoFHWQPAPMxiuf31fi.1; __zi-legacy=3000.SSZzejyD7iu_cVEzsr0LpYAPvhoKKa7GR9V-_yX0IvuWa_-xZK5EaIoJjxoFHWQPAPMxiuf31fi.1; _zlang=vn; app.event.zalo.me=7157198462047919578; _gid=GA1.2.127198964.1726316924; _gat=1; zpw_sek=XShL.419954655.a0.uT2QCehIruHLBT2TgzBNXF7mik-ewFNeqh24qDgSu_7juv7HlfRctU2mdQ_jx-gczwQtgwA2vaMXqrO5RxJNX0",
      imei: "20f701bd-6d4e-4c60-b00b-4ececcf8ca09-a565ccc5e7018c4ec7bec64e38db2966",
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0",
    },
    {
      selfListen: true,
      checkUpdate: true,
    }
  );
  global.client = {
    config: process.env,
    commands: new Map(),
    events: new Map(),
    getTime: function (ts) {
      return new Date(ts).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Asia/Ho_Chi_Minh",
      });
    },
    apis: {},
    mainPath: process.cwd(),
  };

  ['handleCommands', 'handleEvent'].forEach((fn) => {
    require(`./src/core/${fn}`)();
  });

  const api = await zalo.login();
  require("./src/core/listen")(api, zalo);
})();
