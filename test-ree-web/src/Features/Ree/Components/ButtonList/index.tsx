import React from "react";
import { ReeInterface } from "../../../../Interface/ree";
import { map, get } from "lodash";
import styles from "./styles.module.css";

interface ButtonListProps {
  data: ReeInterface[];
  chartValue: ReeInterface | null;
  handleChart: (data: ReeInterface) => void;
}

const ButtonList: React.FC<ButtonListProps> = ({ data, handleChart, chartValue }) => {
  const handleCard = (data: ReeInterface[]) => {
    const listToRender = map(data, (item, key) => {
      return (
        <li className={get(chartValue, "id", null) === item.id ? styles.firstItemSelect : styles.firstItem} onClick={() => handleChart(item)} key={key}>
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

export default ButtonList;
