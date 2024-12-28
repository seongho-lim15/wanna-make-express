export interface Router {
  url: string;
  method: string;
  handler: ()=>void;
}