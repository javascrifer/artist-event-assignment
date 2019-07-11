import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import calendarIcon from '../../assets/calendar.svg';
import facebookIcon from '../../assets/facebook.svg';
import rightArrowIcon from '../../assets/right-arrow.svg';

import { ArtistCardProps } from '../../shared/artist-card-props';
import './ArtistCard.scss';

const ArtistCard: FC<ArtistCardProps> = ({
  artistName,
  name,
  thumb_url,
  facebook_page_url,
  upcoming_event_count,
}) => {
  const artistViewPath = `/${encodeURIComponent(artistName)}/`;

  return (
    <div className="ArtistCard">
      <div className="Image">
        <img src={thumb_url} alt={name} />
      </div>
      <div className="Content">
        <div className="ArtistInfo">
          <p>{name}</p>
          <p className="UpcomingEvents">
            <img src={calendarIcon} alt="Calendar icon" />
            <span>{upcoming_event_count}</span>
            <span> upcoming </span>
            <span>{upcoming_event_count === 1 ? 'event' : 'events'}</span>
          </p>
        </div>
        <div className="Actions">
          {facebook_page_url ? (
            <a className="Facebook" href={facebook_page_url}>
              <img src={facebookIcon} alt="Facebook icon" />
            </a>
          ) : null}
          <Link className="Preview" to={artistViewPath}>
            <span>Preview</span>
            <img src={rightArrowIcon} alt="Right arrow icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(ArtistCard);
