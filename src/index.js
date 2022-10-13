const { ServiceModule, pluginStorage } = require("@tago-io/tcore-sdk");

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

service.onLoad = async (userValues) => {
  console.log("OnLoad Plugin");

  //
  // Plugin Env
  //

  console.log(userValues);
};

service.onDestroy = async () => {
  console.log("onDestroy Plugin");
};
