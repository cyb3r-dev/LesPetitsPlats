import style from './NotFound.module.css';

export default function NotFound() { 
  return (
    <div className={style.errorContainer}>
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
      <div className={style.errorContent}>
        <h1 className={style.title}>404 :(</h1>
        <p className={style.subtitle}>La page que vous demandez est introuvable.</p>
      </div>
    </div>
  );
}