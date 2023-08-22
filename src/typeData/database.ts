export type readRenthinkDB = {
	dbName: string;
	filter?: object;
	orderBy?: {
		order: string;
		column: string;
	};
}
