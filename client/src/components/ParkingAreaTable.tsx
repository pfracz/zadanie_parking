import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import ParkingArea from "../types/ParkingArea";

type Props = {
    areas: ParkingArea[];
    selectedArea: ParkingArea | null;
    onAreaSelection: (selectedArea: ParkingArea) => void;
    onAddButtonClick: () => void;
    onEditButtonClick: () => void;
    onDeleteButtonClick: () => void;
};

const ParkingAreaTable = (props: Props) => {
    return (
        <>
            <main className="container-fluid pt-5 col-xl-8 col-lg-10 col-12">
                <div className="d-flex flex-row gap-1">
                    <Button id="button" outline color="primary" onClick={() => props.onAddButtonClick()}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>

                    <Button
                        outline
                        color={props.selectedArea == null ? "secondary" : "primary"}
                        disabled={props.selectedArea == null}
                        onClick={() => props.onEditButtonClick()}
                    >
                        <FontAwesomeIcon icon={faPencil} />
                    </Button>

                    <Button
                        outline
                        color={props.selectedArea == null ? "secondary" : "primary"}
                        disabled={props.selectedArea == null}
                        onClick={() => props.onDeleteButtonClick()}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>

                <Table responsive bordered hover className="w-100 mt-2">
                    <thead>
                        <tr>
                            <th style={{ width: "auto" }}>Name</th>
                            <th style={{ width: "1%", whiteSpace: "nowrap" }}>Weekday Rate</th>
                            <th style={{ width: "1%", whiteSpace: "nowrap" }}>Weekend Rate</th>
                            <th style={{ width: "1%", whiteSpace: "nowrap" }}>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.areas.map((item: ParkingArea) => {
                            return (
                                <tr
                                    key={item.id}
                                    className={props.selectedArea?.id === item.id ? "table-primary" : ""}
                                    onClick={() => props.onAreaSelection(item)}
                                >
                                    <td>{item.name}</td>
                                    <td className="text-end">
                                        <span>{item.weekdayRate?.toFixed(2)}</span>
                                        <span className="ms-1 fw-light">USD</span>
                                    </td>
                                    <td className="text-end">
                                        <span>{item.weekendRate?.toFixed(2)}</span>
                                        <span className="ms-1 fw-light">USD</span>
                                    </td>
                                    <td className="text-end">
                                        <span>{item.discount?.toFixed(2) || 0.0}</span>
                                        <span className="ms-1 fw-light">%</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </main>
        </>
    );
};

export default ParkingAreaTable;
