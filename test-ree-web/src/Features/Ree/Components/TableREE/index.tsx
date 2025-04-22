import React, { useState, useEffect } from "react";
import {
  TableRow,
  Input,
  TableHeaderCell,
  TableHeader,
  Form,
  FormField,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Icon,
  Menu,
  Table,
  Button,
} from "semantic-ui-react";
import { IRee } from "../../../../Interface/ree";
import { get, isEmpty } from "lodash";
import { getTimeLabel } from "../../../../Utils/formats";
import styles from "./styles.module.css";

interface TableReeProps {
  data: IRee[] | [];
  handleBottom: (item: IRee) => void;
  tableValue: IRee | null;
}

const TableRee: React.FC<TableReeProps> = ({ data, handleBottom, tableValue }) => {
  const itemsPerPage = 5;
  const [activePage, setActivePage] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filterData, setFilterData] = useState<IRee[] | []>([]);

  useEffect(() => {
    if (!isEmpty(data)) {
      setFilterData(data);
    }
  }, []);

  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const handlePageChange = (_: React.MouseEvent<HTMLAnchorElement>, { name }: any) => {
    const newPage = parseInt(name, 10);
    setActivePage(newPage);
  };

  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedData = Array.isArray(filterData) ? filterData.slice(startIndex, startIndex + itemsPerPage) : [];
  const renderRows = () =>
    paginatedData.map((item, key) => (
      <TableRow key={key} className={get(tableValue, "_id", "") === get(item, "_id", null) ? styles.tableRow : styles.tableRowActive}>
        <TableCell>
          <div className={styles.contTableButtom}>
            <Button className={styles.buttom} onClick={() => handleBottom(item)} size="small" color="green">
              Seleccionar
            </Button>
          </div>
        </TableCell>
        <TableCell>{get(item, "data.type", "")}</TableCell>
        <TableCell>{get(item, "data.attributes.description", "")}</TableCell>
        <TableCell>{getTimeLabel(get(item, "createdAt", null), "YYYY-MM-DD HH:mm:ss")}</TableCell>
      </TableRow>
    ));

  const renderPagination = () => (
    <Menu floated="right" pagination>
      <MenuItem as="a" icon onClick={() => activePage > 1 && setActivePage(activePage - 1)} disabled={activePage === 1}>
        <Icon name="chevron left" />
      </MenuItem>
      {Array.from({ length: totalPages }, (_, index) => (
        <MenuItem as="a" name={(index + 1).toString()} active={activePage === index + 1} onClick={handlePageChange} key={index}>
          {index + 1}
        </MenuItem>
      ))}
      <MenuItem as="a" icon onClick={() => activePage < totalPages && setActivePage(activePage + 1)} disabled={activePage === totalPages}>
        <Icon name="chevron right" />
      </MenuItem>
    </Menu>
  );

  const filterByDateRange = (dataMain: IRee[]) => {
    console.log("dataMain", dataMain);
    let startDataUpd = startDate;
    let endDataUpd = endDate;

    if (isEmpty(startDate) && isEmpty(endDate)) {
      setFilterData(dataMain);
      return;
    }

    const filteredData = dataMain.filter((item) => {
      const itemDate = new Date(get(item, "createdAt", ""));

      // Validar si `startDate` y `endDate` están vacíos antes de comparar
      if (!isEmpty(startDate) && itemDate < new Date(startDataUpd)) {
        return false;
      }
      if (!isEmpty(endDate) && itemDate > new Date(endDataUpd)) {
        return false;
      }

      return true;
    });

    setFilterData(filteredData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contTableButtom}>
        <div className={styles.contTime}>
          <Form>
            <FormField inline>
              <Input
                label="Fecha inicio"
                type="date"
                onChange={(e, { value }) => {
                  setStartDate(value);
                }}
              />
              <Input
                label="Fecha final"
                type="date"
                onChange={(e, { value }) => {
                  setEndDate(value);
                }}
                className={styles.inputSearch}
              />
              <Button icon="filter" color="blue" onClick={() => filterByDateRange(data)} className={styles.buttonIcon} />{" "}
            </FormField>
          </Form>
        </div>
      </div>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Acción</TableHeaderCell>
            <TableHeaderCell>Tipo</TableHeaderCell>
            <TableHeaderCell>Descripción</TableHeaderCell>
            <TableHeaderCell>Fecha</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>{renderRows()}</TableBody>
        <TableFooter>
          <TableRow>
            <TableHeaderCell colSpan="4">{renderPagination()}</TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableRee;
