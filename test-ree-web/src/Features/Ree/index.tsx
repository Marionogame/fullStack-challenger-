import React, { useState, useEffect } from "react";
import { get, isEmpty, map, isNull } from "lodash";
import Table from "./Components/TableREE";
import { useQuery, gql } from "@apollo/client";
import { ReeInterface, IAttributesChart, IRee, IIncluded } from "../../Interface/ree";
import { Header, Card, CardContent } from "semantic-ui-react";
import styles from "./styles.module.css";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import ButtonList from "./Components/ButtonList";
import graphqlString from "../../Utils/staticData";
interface ReeProps {}

export const dataJ = gql`
  ${graphqlString}
`;
const Ree: React.FC<ReeProps> = () => {
  const [tableValue, setTableValue] = useState<IRee | null>(null);
  const [ItemData, setItemData] = useState<ReeInterface[] | []>([]);
  const [dataChart, setDataChart] = useState<IAttributesChart | []>([]);
  const [chartValue, setChartValue] = useState<ReeInterface | null>(null);

  const { data, error, loading } = useQuery(dataJ);

  useEffect(() => {
    console.log("data", data);
    if (data && !isEmpty(data.getData)) {
      filterChart(get(data, "getData[0].included", []));
    }
  }, [data]);
  // Formateando la data que proviene del api
  const filterChart = (dataInclude: IIncluded[]): void => {
    const reeType: ReeInterface[] = map(dataInclude, (item) => {
      const reeAttributes = map(item.attributes.content, (item) => {
        return { color: item.attributes.color, total: item.attributes.total, type: item.type };
      });
      return { id: item.id, title: item.type, attributes: reeAttributes };
    });
    if (!isEmpty(reeType)) {
      setItemData(reeType);
      handleChart(reeType[0]);
    }
  };

  // Recuperando datos de la tabla
  const handleBottom = (item: IRee): void => {
    filterChart(get(item, "included", []));
    setTableValue(item);
  };

  // Formateando los datos para el chart
  const handleChart = (data: ReeInterface): void => {
    let type: string[] = [];
    let color: string[] = [];
    let total: number[] = [];
    for (const item of get(data, "attributes", [])) {
      type = [...type, item.type];
      color = [...color, isNull(item.color) ? "" : item.color];
      total = [...total, item.total];
    }
    setChartValue(data);
    setDataChart({
      type,
      color,
      total,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div role="alert">Error occurred</div>;

  if (!data) return <div role="alert">No data available</div>;

  return (
    <div className={styles.container}>
      <div className={styles.containerTableGroup}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>REE (Red Eléctrica de España)</div>
        </div>
        <div className={styles.containerChart}>
          <div className={styles.containerButtonList}>
            <div>
              <Header as="h1">REE (Opciones)</Header>
              <Card className={styles.cardContain}>
                <CardContent>
                  <ButtonList chartValue={chartValue} data={ItemData} handleChart={handleChart} />{" "}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className={styles.containerBarChart}>
            <Box sx={{ width: "100%" }}>
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: get(dataChart, "type", []),
                    colorMap: {
                      type: "ordinal",
                      colors: get(dataChart, "color", []),
                    },
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: get(dataChart, "total", []),
                  },
                ]}
                height={400}
              />
            </Box>
          </div>
        </div>
        <Table handleBottom={handleBottom} tableValue={tableValue} data={get(data, "getData", [])} />
      </div>
    </div>
  );
};

export default Ree;
