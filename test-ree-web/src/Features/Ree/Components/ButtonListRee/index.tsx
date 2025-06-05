import React from "react";

// Utils
import { ReeInterface } from "../../../../Interface/ree";
import { map, get } from "lodash";

// Styles
import styles from "./styles.module.css";

interface ButtonListReeProps {
  data: ReeInterface[];
  chartValue: ReeInterface | null;
  handleChart: (data: ReeInterface) => void;
}

const ButtonListRee: React.FC<ButtonListReeProps> = ({ data, handleChart, chartValue }) => {
  const handleCard = (data: ReeInterface[]) => {
    const listToRender = map(data, (item) => {
      return (
        <li
          className={get(chartValue, "id", null) === item.id ? styles.firstItemSelect : styles.firstItem}
          onClick={() => handleChart(item)}
          aria-label={"button_List_select"}
          key={item.id}>
          <div className={styles.flexBetween}>
            {item.title}
            <span className={styles.badge}>{item.attributes.length}</span>
          </div>
        </li>
      );
    });

    return (
      <div>
        <div className={styles.containerList}>{listToRender}</div>
      </div>
    );
  };
  return <div>{handleCard(data)}</div>;
};

export default ButtonListRee;
