export interface EventElementParam {
  name: string;
  dateTime: string;
  location: string;
  description: string;
  organizer: string;
  type: string;
}
export interface EventElement extends EventElementParam {
  id: string;
}
