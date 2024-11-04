import axios from "axios";
import ParkingArea from "../types/ParkingArea";

export const getParkingAreas = async () => {
    return axios.get<ParkingArea[]>("http://localhost:3000/parking-area");
};

export const createParkingArea = (parkingArea: ParkingArea) => {
    return axios.post<{ id: string }>("http://localhost:3000/parking-area", {
        name: parkingArea.name,
        weekdayRate: parkingArea.weekdayRate,
        weekendRate: parkingArea.weekendRate,
        discount: parkingArea.discount,
    });
};

export const editParkingArea = (parkingArea: ParkingArea) => {
    return axios.patch("http://localhost:3000/parking-area", {
        id: parkingArea.id,
        name: parkingArea.name,
        weekdayRate: parkingArea.weekdayRate,
        weekendRate: parkingArea.weekendRate,
        discount: parkingArea.discount,
    });
};

export const deleteParkingArea = async (id: string) => {
    return axios.delete(`http://localhost:3000/parking-area/${id}`);
};
