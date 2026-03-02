
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 815, hash: 'c655bae90404a0d00c02799d21315f23250ec14d2cab0fa45f5ca4e9df103620', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1017, hash: '9aecbfd272bc0f9b305000c6d40f58e96a7064b9ce8cb2502d3cd7a1ff30964e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-PH5QZW6A.css': {size: 186, hash: '08ViHY/xP6M', text: () => import('./assets-chunks/styles-PH5QZW6A_css.mjs').then(m => m.default)}
  },
};
