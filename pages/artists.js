import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { client, urlFor } from '../utils/sanityClient';
import Head from '../components/head';
import Nav from '../components/nav';

const Artists = ({ artists }) => {
  console.log(artists);
  return (
    <div>
      <Head title="Artists" />
      <Nav />

      <div className="hero">

        <div className="row">
          {
            artists.map(artist => (
              <Link href="/artists" key={artist._id}>
                <a className="card">
                  <h3>{artist.name}</h3>
                  {artist.image &&
                    <>
                      <hr />
                      <img src={urlFor(artist.image).width(200).height(200).url()} />
                    </>
                  }
                  {
                    artist.albums.map(album => (
                      album.releaseDate && album.title && <p><b>{moment(album.releaseDate).format('YYYY')}</b> - {album.title}</p>
                    ))
                  }
                </a>
              </Link>
            ))
          }
        </div>
      </div>

      <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
    </div>
  )
};

Artists.getInitialProps = () => {
  return client.fetch(
    `*[_type == 'artist']{_id, name, image, albums[]->}`,
  ).then(res => {
    return { artists: res }
  })
}

export default Artists;
