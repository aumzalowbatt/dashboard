declare global {
  interface Window {
    globalConfig: any;
  }
}
let globalConfig = window.globalConfig;

export const environment = {
  production: true,
  API_SERVER_ADDRESS: globalConfig.API_SERVER_ADDRESS,
};
