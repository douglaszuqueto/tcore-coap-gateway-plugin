const { ServiceModule } = require("@tago-io/tcore-sdk");

const service = new ServiceModule({
  id: "tcore-coap-gateway-plugin",
  name: "CoAP Gateway Service",
});

// `onLoad` is used to run your code.
// This function will be called once when your plugin gets loaded.
service.onLoad = async () => {
  console.log("OnLoad Plugin");
};

// `onDestroy` is used to clean up your code.
// This function will never be called before `onLoad`.
service.onDestroy = async () => {
  console.log("onDestroy Plugin");
};
