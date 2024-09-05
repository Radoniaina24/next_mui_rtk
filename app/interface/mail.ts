export default interface Mail {
  id: string;
  name: string;
  cc: Array<String>;
  subject: string;
  body: string;
}
