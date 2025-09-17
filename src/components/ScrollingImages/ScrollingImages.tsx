import style from "./Scrollingimages.module.css";

export const ScrollingImages = () => {
  return (
    <div className={style.container}>
      <div className={style.scroller}>
        <div className={style.scrollingimg}>
          <img src="/logos/1.png" alt="1" />
          <img src="/logos/2.png" alt="2" />
          <img src="/logos/3.png" alt="3" />
          <img src="/logos/4.png" alt="4" />
          <img src="/logos/5.png" alt="5" />
          <img src="/logos/6.png" alt="6" />
          <img src="/logos/7.png" alt="7" />
          <img src="/logos/8.png" alt="8" />
          <img src="/logos/9.png" alt="9" />
        </div>

        {/* Duplicado para efecto infinito */}
        <div className={style.scrollingimg}>
          <img src="/logos/1.png" alt="1" />
          <img src="/logos/2.png" alt="2" />
          <img src="/logos/3.png" alt="3" />
          <img src="/logos/4.png" alt="4" />
          <img src="/logos/5.png" alt="5" />
          <img src="/logos/6.png" alt="6" />
          <img src="/logos/7.png" alt="7" />
          <img src="/logos/8.png" alt="8" />
          <img src="/logos/9.png" alt="9" />
        </div>
      </div>
    </div>
  );
};
