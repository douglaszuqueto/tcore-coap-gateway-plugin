const { ServiceModule, pluginStorage } = require("@tago-io/tcore-sdk");
const { spawn } = require("child_process");

let child = null;

const service = new ServiceModule({
  id: "tcore-coap-gateway-plugin",
  name: "CoAP Gateway Service",
  configs: [
    {
      type: "number",
      field: "port",
      name: "Port",
      icon: "cog",
      required: true,
      defaultValue: 5683,
    },
  ],
});

service.onLoad = async (userValues) => {
  console.log("OnLoad Plugin");

  //
  // CoAP Service
  //

  child = spawn(__dirname + "/coap", {
    env: {
      COAP_PORT: userValues.port,
    },
  });

  child.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  child.on("exit", function (code, signal) {
    console.log(
      "child process exited with " + `code ${code} and signal ${signal}`
    );
  });
};

// `onDestroy` is used to clean up your code.
// This function will never be called before `onLoad`.
service.onDestroy = async () => {
  console.log("onDestroy Plugin");

  child.kill("SIGINT");
};
