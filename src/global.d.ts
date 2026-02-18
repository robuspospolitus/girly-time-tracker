export {};

declare global {
  interface Window {
    api: {
      getData: () => Promise<any>;
      postCategory: (category: string, payload: any) => Promise<any>;
      deleteItem: (category: string, id: string) => Promise<any>;
      deleteCategory: (category: string) => Promise<any>;
    };
  }
}