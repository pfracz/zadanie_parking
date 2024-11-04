class ParkingArea {
    id: string | null;
    name: string;
    weekdayRate: number;
    weekendRate: number;
    discount: number;

    constructor(id: string | null, name: string, weekdayRate: number, weekendRate: number, discount: number) {
        this.id = id;
        this.name = name;
        this.weekdayRate = weekdayRate;
        this.weekendRate = weekendRate;
        this.discount = discount;
    }
}

export default ParkingArea;
