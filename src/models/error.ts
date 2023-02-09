export default interface Error {
  status: number;
  statusText: string;
  data: {
    message: string;
  };
}
