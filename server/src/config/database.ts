import { DocumentStore } from "ravendb";

const db_url = process.env.DB_URL || "http://127.0.0.1:8080";
const db_name = process.env.DB_NAME || "zadanie_parking";

const store = new DocumentStore(db_url, db_name);
store.initialize();

export default store;
