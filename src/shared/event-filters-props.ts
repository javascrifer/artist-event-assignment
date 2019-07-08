import { MouseEvent } from 'react';
import { EventDate } from './event-date.enum';

export interface EventFiltersProps {
  eventDate: EventDate;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}
