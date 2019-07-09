import React, { FC, memo } from 'react';

import dateIcon from '../../assets/date.png';
import locationIcon from '../../assets/location.png';
import { EventsProps } from '../../shared/events-props';
import { toDateTimeString } from '../../shared/helpers';
import './Events.scss';

const Events: FC<EventsProps> = ({ events }) => {
  return (
    <div className="Events">
      {events.length ? (
        events.map(({ id, datetime, description, venue }) => (
          <div className="Event" key={id}>
            {description ? <p className="Description">{description}</p> : null}
            <div className="Details">
              <p>
                <img src={dateIcon} alt="Date icon" />
                <span>{toDateTimeString(datetime)}</span>
              </p>
              <p>
                <img src={locationIcon} alt="Location icon" />
                <span>{`${venue.name}, ${venue.city}, ${venue.country}`}</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="Notice">Events not found</p>
      )}
    </div>
  );
};

export default memo(Events);
