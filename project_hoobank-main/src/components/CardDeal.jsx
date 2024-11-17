import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import code from '../assets/code.jpg';
const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Our Vision <br className="sm:block hidden" />
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      At Code Flame Squad, we envision a future where AI-powered interviews become the norm, enabling individuals to showcase their skills and talents in a more efficient and accurate manner.<br/>

      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={code} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
