import React from 'react';
import style from './SmallHeader.module.css';


export default function SmallHeader() {
  return (
    <header className={style.header}>
      <img
        src="/images/banner.png"
        alt="Les Petits Plats Banner"
        className={style.bannerImage}
      />
      <img
        src="/images/logo.png"
        alt="Les Petits Plats Logo"
        className={style.logo}
      />
    </header>
  );
}