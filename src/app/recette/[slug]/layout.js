import style from './recipePage.module.css';

export default function RecipeLayout({ children }) {
  return (
    
    <main className={style.main}>
        {children}
    </main>
  );
}