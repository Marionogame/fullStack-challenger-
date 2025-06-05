import React from "react";

// libraries
import { Header, Icon, CardHeader, CardGroup, CardDescription, FeedSummary, CardContent, Button, Card } from "semantic-ui-react";
import { map, get, isEmpty } from "lodash";

// Utils
import { IRee } from "../../../../Interface/ree";
import { getTimeLabel } from "../../../../Utils/formats";

// Styles
import styles from "./styles.module.css";

interface ListCardReeProps {
  data: IRee[] | [];
  handleButtom: (item: IRee) => void;
  tableValue: IRee | null;
}

const ListCardRee: React.FC<ListCardReeProps> = ({ data, handleButtom, tableValue }) => {
  const handleCard = (data: IRee[]) => {
    if (!isEmpty(data)) {
      const listToRender = map(data, (item, index) => {
        return (
          <Card key={index} color="blue" className={get(tableValue, "_id", "") === get(item, "_id", null) ? styles.cardSelect : styles.card}>
            <CardContent>
              <CardHeader>{get(item, "data.type", "")}</CardHeader>
              <FeedSummary>{getTimeLabel(get(item, "createdAt", null), "MMMM Do YYYY")}</FeedSummary>
              <CardDescription>{get(item, "data.attributes.description", "")}</CardDescription>
            </CardContent>
            <CardContent extra>
              <div className="ui two buttons">
                <Button aria-label={"list-card-select"} onClick={() => handleButtom(item)} color="green">
                  Seleccionar
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      });

      return <CardGroup>{listToRender}</CardGroup>;
    }
    return (
      <div style={{ textAlign: "center" }}>
        <Header as="h2" icon>
          <Icon name="settings" />
          No Data Found
        </Header>
      </div>
    );
  };
  return <div className={styles.cardContainer}>{handleCard(data)}</div>;
};

export default ListCardRee;
