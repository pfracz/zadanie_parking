import store from "../config/database";
import ParkingArea from "../models/parkingAreaModel";

export const getParkingAreas = async (): Promise<ParkingArea[]> => {
    const session = store.openSession();

    let parkingAreas: ParkingArea[] | null = await session.advanced.loadStartingWith("ParkingAreas/");

    if (!parkingAreas) return [];

    return parkingAreas;
};

export const createParkingArea = async (parkingArea: ParkingArea): Promise<string> => {
    const session = store.openSession();

    await session.store(parkingArea);
    await session.saveChanges();

    if (!parkingArea.id) throw new Error("Error while creating new parking area.");

    return parkingArea.id;
};

export const updateParkingArea = async (parkingArea: ParkingArea): Promise<void> => {
    const session = store.openSession();

    if (!parkingArea.id) throw new Error("Error while updating parking area (id is required).");

    let foundParkingArea: ParkingArea | null = await session.load<ParkingArea>(parkingArea.id);

    if (!foundParkingArea) throw new Error("Error while updating parking area (parking area not found).");

    foundParkingArea.name = parkingArea.name;
    foundParkingArea.weekdayRate = parkingArea.weekdayRate;
    foundParkingArea.weekendRate = parkingArea.weekendRate;
    foundParkingArea.discount = parkingArea.discount;

    await session.saveChanges();

    if (!parkingArea.id) throw new Error("Error while updating parking area.");
};

export const deleteParkingArea = async (parkingAreaId: string): Promise<void> => {
    const session = store.openSession();

    await session.delete(parkingAreaId);
    await session.saveChanges();
};
