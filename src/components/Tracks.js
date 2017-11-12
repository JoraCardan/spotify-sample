import React from 'react';

const Tracks = (props) => {
  const buildItems = () => {
    if (props.items.length < 1) {
      return <li>Looking for music</li>
    } else {
      return props.items.map(item => {
        return (
          <li key={item.id} onClick={e => props.toggleItem(e, item)}>
            <figure>
              <img src={item.album.images[0].url} />
            </figure>
            <div className="content">
              <a href={item.external_urls.spotify} target="_blank">
                <h3>Album: {item.album.name}</h3>
                <h4>Song: {item.name}</h4>
              </a>
            </div>
          </li>
        );
      });
    }
  }
  return (
    <ul className="tracks">
      {buildItems()}
    </ul>
  )
};

export default Tracks;
