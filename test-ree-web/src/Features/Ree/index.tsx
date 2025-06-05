import React, { useState, useEffect } from "react";

// libraries
import { Card, CardContent, Loader, Dimmer, Image } from "semantic-ui-react";
import { get, isEmpty, map, isString } from "lodash";
import { BarChart, PieChart } from "@mui/x-charts";
import { legendClasses } from "@mui/x-charts/ChartsLegend";
import Box from "@mui/material/Box";

// Components
import TableRee from "./Components/TableRee";
import ListCardOrion from "./Components/ListCardRee";
import ButtonListRee from "./Components/ButtonListRee";
import light_bulb from "../../assets/light_bulb.png";

// Utils
import { getTimeLabel } from "../../Utils/formats";
import { ReeInterface, IAttributesChart, IAttributesChartPie, IRee, IIncluded } from "../../Interface/ree";

// Api
import { useQuery, gql } from "@apollo/client";
import graphqlString from "../../Utils/staticData";

// Styles
import styles from "./styles.module.css";

interface ReeProps {}

export const dataJ = gql`
  ${graphqlString}
`;
const Ree: React.FC<ReeProps> = () => {
  const [tableValue, setTableValue] = useState<IRee | null>(null);
  const [ItemData, setItemData] = useState<ReeInterface[] | []>([]);
  const [dataChart, setDataChart] = useState<IAttributesChart | []>([]);
  const [dataChartPie, setDataChartPie] = useState<IAttributesChartPie[] | []>([]);

  const [chartValue, setChartValue] = useState<ReeInterface | null>(null);
  const [isMovil, setIsMovil] = useState<boolean>(false);

  const { data, error, loading } = useQuery(dataJ);

  useEffect(() => {
    if (data && !isEmpty(data.getData)) {
      filterChart(get(data, "getData[0].included", []));
      setTableValue(get(data, "getData[0]", null));
    }
  }, [data]);

  // Detect if it's mobile or desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMovil(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Formatting the data from the API to the chart
  const filterChart = (dataInclude: IIncluded[]): void => {
    const reeType: ReeInterface[] = map(dataInclude, (item) => {
      const reeAttributes = map(item.attributes.content, (item) => {
        return { color: item.attributes.color, total: item.attributes.total, type: item.type };
      });
      return { id: item.id, title: item.type, attributes: reeAttributes };
    });

    setItemData(reeType);
    handleChart(reeType[0]);
  };

  const handleButtom = (item: IRee): void => {
    filterChart(get(item, "included", []));
    setTableValue(item);
  };

  // Formatting data for the chart
  const handleChart = (data: ReeInterface): void => {
    let label: string[] = [];
    let color: string[] = [];
    let value: number[] = [];
    let pieChartData: IAttributesChartPie[] = [];
    for (const item of get(data, "attributes", [])) {
      if (!isMovil) {
        label = [...label, item.type];
        color = [...color, !isString(item.color) ? "" : item.color];
        value = [...value, item.total];
      } else {
        pieChartData = [...pieChartData, { label: item.type, value: item.total, color: !isString(item.color) ? "" : item.color }];
      }
    }
    if (isMovil) {
      setDataChartPie(pieChartData);
    } else {
      setDataChart({
        label,
        color,
        value,
      });
    }
    setChartValue(data);
  };

  if (loading)
    return (
      <Dimmer active>
        <Loader size="massive">Loading...</Loader>
      </Dimmer>
    );
  if (error)
    return (
      <div className={styles.dialogContainer}>
        <div className={styles.dialogLight}>
          <Image src={light_bulb} className={styles.imageLight} />

          <div>
            <div className={styles.dialog}>
              <h1 className={styles.textDialog}>Ups, ha ocurrido un error en nuestros servicios.</h1>
              <p className={styles.secondTextDialog}>Estamos trabajando para solucionarlo lo antes posible. ¡Gracias por tu paciencia!</p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.containerTableGroup}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>REE (Red Eléctrica de España)</div>
        </div>
        <div className={styles.containerChart}>
          <div className={styles.containerButtonList}>
            {!isEmpty(ItemData) && (
              <div>
                <div className={styles.titleTime}>{getTimeLabel(get(tableValue, "createdAt", null), "MMMM Do YYYY")}</div>

                <div className={styles.titleOptions}>REE (Opciones)</div>

                <Card className={styles.cardContain}>
                  <CardContent>
                    <ButtonListRee chartValue={chartValue} data={ItemData} handleChart={handleChart} />{" "}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          <div className={styles.containerBarChart}>
            <Box sx={{ width: "100%" }}>
              {isMovil ? (
                <PieChart
                  aria-label={"PieChart"}
                  series={[
                    {
                      data: dataChartPie,
                    },
                  ]}
                  slotProps={{
                    legend: {
                      direction: "horizontal",
                      sx: {
                        gap: "16px",
                        [`.${legendClasses.mark}`]: {
                          height: 15,
                          width: 15,
                        },
                        [".MuiChartsLegend-series"]: {
                          gap: "8px",
                        },
                      },
                    },
                  }}
                  width={200}
                  height={200}
                />
              ) : (
                <BarChart
                  aria-label={"BarChart"}
                  xAxis={[
                    {
                      id: "barCategories",
                      data: get(dataChart, "label", []),

                      colorMap: {
                        type: "ordinal",
                        colors: get(dataChart, "color", []),
                      },
                      scaleType: "band",
                    },
                  ]}
                  series={[
                    {
                      data: get(dataChart, "value", []),
                    },
                  ]}
                  height={400}
                />
              )}
            </Box>
          </div>
        </div>
        {isMovil ? (
          <ListCardOrion handleButtom={handleButtom} tableValue={tableValue} data={get(data, "getData", [])} />
        ) : (
          <TableRee handleButtom={handleButtom} tableValue={tableValue} data={get(data, "getData", [])} />
        )}
      </div>
    </div>
  );
};

export default Ree;
