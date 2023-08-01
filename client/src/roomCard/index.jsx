import styles from "./styles.module.css";
import PropTypes from "prop-types";
import { notification } from "../assets";
export default function RoomCardss({ item }) {
  return (
    <div className={styles.card_wrapper}>
      <div className="cards">
        <div className="cards__item">
          <div className="card">
            <div className="card__image card__image--fence">
              <img src={notification} width={200} height={200} alt="/" />
            </div>
            <div className="card__content">
              <div className="card__title">Flex</div>
              <p className="card__text">
                This is the shorthand for flex-grow, flex-shrink and flex-basis
                combined. The second and third parameters (flex-shrink and
                flex-basis) are optional. Default is 0 1 auto.{" "}
              </p>
              <button className="btn btn--block card__btn">Button</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RoomCardss.propTypes = {
  item: PropTypes.object,
};
