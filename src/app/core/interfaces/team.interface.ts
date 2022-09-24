export interface TeamInterface {
  id: number;
  name: string;
  description: string;
  leader: {
    [key: string]: any;
  };
}
