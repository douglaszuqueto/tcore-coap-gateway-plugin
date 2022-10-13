const { ServiceModule, pluginStorage } = require("@tago-io/tcore-sdk");
const { spawn } = require("child_process");
const path = require("path");

const service = new ServiceModule({
  id: "tcore-coap-gateway-plugin",
  name: "CoAP Gateway Service",
  configs: [
    {
      name: "CoAP Server",
      type: "group",
      configs: [
        {
          type: "number",
          field: "udp_port",
          name: "UDP Port",
          icon: "cog",
          required: true,
          defaultValue: 5683,
        },
        {
          type: "number",
          field: "dtls_port",
          name: "DTLS Port",
          icon: "cog",
          required: true,
          defaultValue: 5684,
        },
      ],
    },
    {
      type: "divisor",
    },
    {
      name: "Internal API",
      type: "group",
      configs: [
        {
          type: "number",
          field: "api_port",
          name: "Port",
          icon: "cog",
          required: true,
          defaultValue: 3000,
        },
        {
          type: "string",
          field: "api_token",
          name: "Token",
          icon: "lock",
          required: true,
        },
      ],
    },
  ],
});

let child = null;

service.onLoad = async (userValues) => {
  console.log("OnLoad Plugin");

  //
  // Plugin Env
  //

  console.log(userValues);

  const env = {
    TCORE_COAP_PLUGIN_COAP_UDP_PORT: userValues.udp_port,
    TCORE_COAP_PLUGIN_COAP_DTLS_PORT: userValues.dtls_port,
    TCORE_COAP_PLUGIN_API_TOKEN: userValues.api_token,
    TCORE_COAP_PLUGIN_API_PORT: userValues.api_port,
  };

  //
  // CoAP Service
  //

  child = spawn(path.join(__dirname, "bin") + "/coap", {
    env: env,
  });

  child.on("exit", function (code, signal) {
    console.log(
      "child process exited with " + `code ${code} and signal ${signal}`
    );
  });

  child.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  child.stderr.on("data", (data) => {
    console.log(`${data}`);
  });
};

service.onDestroy = async () => {
  console.log("onDestroy Plugin");

  child.kill("SIGINT");
};
