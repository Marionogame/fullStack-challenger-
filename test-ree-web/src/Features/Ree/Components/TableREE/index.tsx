import React, { useState, useEffect } from "react";

// libraries
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
  Header,
} from "semantic-ui-react";
import { get, isEmpty, isArray } from "lodash";

// Utils
import { IRee } from "../../../../Interface/ree";
import { getTimeLabel } from "../../../../Utils/formats";

// Styles
import styles from "./styles.module.css";

interface TableReeProps {
  data: IRee[] | [];
  handleButtom: (item: IRee) => void;
  tableValue: IRee | null;
}

const TableRee: React.FC<TableReeProps> = ({ data, handleButtom, tableValue }) => {
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
  const paginatedData = Array.isArray(filterData) && filterData.slice(startIndex, startIndex + itemsPerPage);

  const renderRows = () => {
    if (!isEmpty(paginatedData) && isArray(paginatedData)) {
      return paginatedData.map((item: IRee) => (
        <TableRow
          key={item._id}
          onDoubleClick={() => handleButtom(item)}
          className={get(tableValue, "_id", "") === get(item, "_id", null) ? styles.tableRow : styles.tableRowActive}>
          <TableCell>
            <div className={styles.contTableButtom}>
              <Button className={styles.buttom} onClick={() => handleButtom(item)} size="small" color="green">
                Seleccionar
              </Button>
            </div>
          </TableCell>
          <TableCell>{get(item, "data.type", "")}</TableCell>
          <TableCell>{get(item, "data.attributes.description", "")}</TableCell>
          <TableCell>{getTimeLabel(get(item, "createdAt", null), "MMMM Do YYYY")}</TableCell>
        </TableRow>
      ));
    }
    return (
      <tr>
        <td colSpan={4} style={{ textAlign: "center" }}>
          <Header as="h2" icon>
            <Icon name="settings" />
            No Data Found
          </Header>
        </td>
      </tr>
    );
  };

  const renderPagination = () => (
    <Menu floated="right" pagination>
      <MenuItem as="a" aria-label={"page-change-back"} icon onClick={() => activePage > 1 && setActivePage(activePage - 1)} disabled={activePage === 1}>
        <Icon name="chevron left" />
      </MenuItem>

      {Array.from({ length: totalPages }, (_, index) => (
        <MenuItem
          as="a"
          name={(index + 1).toString()}
          aria-label={`page-change-${(index + 1).toString()}`}
          active={activePage === index + 1}
          onClick={handlePageChange}
          key={index}>
          {index + 1}
        </MenuItem>
      ))}

      <MenuItem
        as="a"
        aria-label={"page-change-next"}
        icon
        onClick={() => activePage < totalPages && setActivePage(activePage + 1)}
        disabled={activePage === totalPages}>
        <Icon name="chevron right" />
      </MenuItem>
    </Menu>
  );

  // Filter by maximum and minimum date
  const filterByDateRange = () => {
    let startDataUpd = startDate;
    let endDataUpd = endDate;
    setActivePage(1);
    if (isEmpty(data) || !isArray(data)) {
      return false;
    }
    if (isEmpty(startDate) && isEmpty(endDate)) {
      setFilterData(data);
      return false;
    }

    const filteredData = data.filter((item) => {
      const itemDate = new Date(get(item, "createdAt", ""));

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
                aria-label={"start-date"}
                type="date"
                onChange={(_e, { value }) => {
                  setStartDate(value);
                }}
              />
              <Input
                label="Fecha final"
                aria-label={"end-date"}
                type="date"
                onChange={(_e, { value }) => {
                  setEndDate(value);
                }}
                className={styles.inputSearch}
              />

              <Button icon="filter" aria-label={"filterTable"} color="blue" onClick={() => filterByDateRange()} className={styles.buttonIcon} />
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
