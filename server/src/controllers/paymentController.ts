import store from "../config/database";
import currencyExchange from "../helpers/currencyExchange";
import Currency from "../models/currency";
import ParkingArea from "../models/parkingAreaModel";

export const calculateAmountToPay = async (
    parkingAreaId: string,
    startTime: string,
    endTime: string,
    day: string,
    currency: Currency
): Promise<number> => {
    const session = store.openSession();
    let amountToPay: number = 0;

    // Get parking area from database
    let parkingArea: ParkingArea | null = await session.load(parkingAreaId);
    if (!parkingArea) throw new Error("Parking area not found");

    // Check if weekend day
    let dayIndex: number = new Date(day).getDay();
    let isWeekendDay: boolean = false;
    if (dayIndex === 0 || dayIndex === 6) isWeekendDay = true;

    // Count how many hours
    let startSplit = startTime.split(":");
    let endSplit = endTime.split(":");
    var startDate = new Date(0, 0, 0, Number(startSplit[0]), Number(startSplit[1]), 0);
    var endDate = new Date(0, 0, 0, Number(endSplit[0]), Number(endSplit[1]), 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.ceil(diff / 1000 / 60 / 60);

    // Calculate amount to pay
    amountToPay = hours * (isWeekendDay ? parkingArea.weekendRate : parkingArea.weekdayRate);

    // Add discount
    let discount = amountToPay * (parkingArea.discount / 100);
    amountToPay -= discount;

    // Convert currency
    if (currency !== Currency.USD) amountToPay = await currencyExchange(amountToPay, day, currency);

    return amountToPay;
};
