import React, { FC, Fragment, memo } from 'react';

import { EventDate } from '../../shared/event-date.enum';
import { EventFiltersProps } from '../../shared/event-filters-props';
import './EventFilters.scss';

const filters = [
  ['Upcoming', EventDate.Upcoming],
  ['Past', EventDate.Past],
  ['All', EventDate.All],
];

const EventFilters: FC<EventFiltersProps> = ({ eventDate, onClick }) => {
  return (
    <Fragment>
      <h4 className="EventFiltersTitle">Choose event date</h4>
      <div className="EventFilters">
        {filters.map(([name, value]) => (
          <button
            type="button"
            key={value}
            className={eventDate === value ? 'active' : ''}
            data-value={value}
            onClick={onClick}
          >
            {name}
          </button>
        ))}
      </div>
    </Fragment>
  );
};

export default memo(EventFilters);
