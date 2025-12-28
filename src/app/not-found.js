import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import style from './NotFound.module.css';

export default function GlobalNotFound() {
  return (
    <div className="main-container">
      <main className={style.main404}>
        <NotFound />
      </main>
      <Footer />
    </div>
  );
}