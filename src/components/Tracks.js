import React from 'react';
import PropTypes from 'prop-types';

const Tracks = (props) => {
  const buildItems = () => {
    if (props.items.length < 1) {
      return null
    } else {
      return props.items.map(item => {
        const isChecked = props.seed && props.seed.indexOf(item.id) >= 0;
        return (
          <li className="tracks__item" key={item.id}>
            <figure className="tracks__figure">
              <img className="tracks__img" src={item.album.images[0].url} alt={item.name} />
            </figure>
            <div className="tracks__content">
              <h4 className="heading heading--bordered">Album: <a className="tracks__link" href={item.album.external_urls.spotify} target="_blank">{item.album.name}</a></h4>
              <h5 className="heading">Song: <a className="tracks__link" href={item.external_urls.spotify} target="_blank">{item.name}</a></h5>
              {props.toggleItem && <button
                className={`btn tracks__btn ${isChecked && 'tracks__btn--selected btn--disabled'}`}
                onClick={e => props.toggleItem(item.id)}
              >&hearts;</button>}
            </div>
          </li>
        );
      });
    }
  };
  return (
    <ul className="tracks">
      {buildItems()}
      {props.children}
    </ul>
  )
};

Tracks.propTypes = {
  items: PropTypes.array,
  seed: PropTypes.array,
  toggleItem: PropTypes.func,
  children: PropTypes.element,
};

export default Tracks;
