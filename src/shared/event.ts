import { Venue } from './venue';

export interface Event {
  id: number;
  datetime: string;
  description?: string;
  venue: Venue;
}
