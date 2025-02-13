import React from "react";
import PropTypes from "prop-types";
import { BsPersonFill } from "react-icons/bs";
import * as EMBED from "../constants/embed";
import { SiHashnode } from "react-icons/si";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";

function LinkCard({ link }) {
  return (
    <a
      href={link.link}
      target="_blank"
      rel="noreferrer"
      className="link-container"
    >
      <div className="link-card">
        <p className="link-title">{link.title}</p>
        <p className="link-description">{link.description}</p>
      </div>
    </a>
  );
}

function Embed({ link }) {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)&?/;

  const spotifyRegex = /(?<=(com\/))(?:...)+/;

  if (link.embed === EMBED.YOUTUBE)
    return (
      <a
        href={`https://www.youtube.com/watch?v=${
          youtubeRegex.exec(link.link)[1]
        }`}
        rel="noreferrer"
        target="_blank"
        className="link-container"
      >
        {" "}
        <div className="link-card">
          <img
            style={{ width: "8rem", borderRadius: "0.75rem" }}
            src={`https://img.youtube.com/vi/${
              youtubeRegex.exec(link.link)[1]
            }/hqdefault.jpg`}
            alt="thumbnail"
          />
          <p className="link-description">{link.title}</p>
        </div>
      </a>
    );

  return (
    <div className="link-container">
      <div className="link-card">
        <iframe
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/${
            spotifyRegex.exec(link.link)[0]
          }`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media;"
        ></iframe>
        <p className="link-description">{link.title}</p>
      </div>
    </div>
  );
}

export default function StaticPage({
  imgSrc,
  profileName,
  about,
  links,
  socials,
}) {
  return (
    <div className="page">
      {imgSrc ? (
        <div className="img-container">
          <img src={imgSrc} alt="" />
        </div>
      ) : (
        <BsPersonFill
          style={{
            padding: "0.5rem",
            color: "rgb(107 114 128)",
          }}
          size={96}
        />
      )}
      {profileName ? (
        <h1 className="name">{profileName}</h1>
      ) : (
        <h1 className="name">@yourname</h1>
      )}
      <p className="about">{about}</p>
      <div className="link-wrapper">
        {links
          ?.filter((link) => link.active !== false && link.title && link.link)
          .map((link) => {
            if (link.embed) return <Embed key={link.title} link={link} />;
            return <LinkCard key={link.title} link={link} />;
          })}
      </div>
      <div className="socials-container">
        {socials.twitter && (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`https://twitter.com/${socials.twitter}`}
          >
            <FiTwitter size={45} className="m-2" />
          </a>
        )}
        {socials.instagram && (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`https://instagram.com/${socials.instagram}`}
          >
            <FiInstagram size={45} className="m-1" />
          </a>
        )}
        {socials.facebook && (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={socials.facebook}
          >
            <FiFacebook size={45} className="m-1" />
          </a>
        )}
        {socials.linkedin && (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={socials.linkedin}
          >
            <FiLinkedin size={45} className="m-1" />
          </a>
        )}
        {socials.github && (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`https://github.com/${socials.github}`}
          >
            <FiGithub size={45} className="m-1" />
          </a>
        )}
        {socials.hashnode && (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`https://hashnode.com/@${socials.hashnode}`}
          >
            <SiHashnode size={45} className="m-1" />
          </a>
        )}
      </div>
    </div>
  );
}

LinkCard.propTypes = {
  link: PropTypes.object.isRequired,
};

Embed.propTypes = {
  link: PropTypes.object.isRequired,
  linkStyle: PropTypes.object,
  linkColor: PropTypes.string,
  linkFontColor: PropTypes.string,
};

StaticPage.propTypes = {
  imgSrc: PropTypes.string,
  profileName: PropTypes.string,
  about: PropTypes.string,
  links: PropTypes.array,
  socials: PropTypes.object,
};
