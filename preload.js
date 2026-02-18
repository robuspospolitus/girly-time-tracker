const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getData: () => ipcRenderer.invoke('get-data'),
    putData: (payload) => ipcRenderer.invoke('put-data', payload),
    postCategory: (category, payload) =>
        ipcRenderer.invoke('post-category', { category, payload }),
    deleteItem: (category, id) =>
        ipcRenderer.invoke('delete-item', { category, id }),
    deleteCategory: (category) =>
        ipcRenderer.invoke('delete-category', category),
});