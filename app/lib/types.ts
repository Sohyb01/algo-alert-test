export type DatatableRowProps = {
  date_and_time: string; // "b: Time" -
  symbol: string; // "a: Symbol" -
  expiration_date: string; // "e: Exp Date" -
  strike_price: number; // "d: Strike" -
  contract: "CALL" | "PUT"; // "c: C/P" -
  size: number; // "g: Size" -
  price: number; // "h: Price" -
  premium: number; // "trade_value" -
  execution: "BID" | "MID" | "ASK"; // "f: Side" -
  DTE: string; // "j: DTE" -
};

export type DatatableProps = {
  data: Object;
};

export type TopPurchasesRowProps = {
  symbol: string;
  strike: string;
  expiration_date: string;
  total_size: number;
  calls: number;
  puts: number;
};

// {
//   symbol: string;
//   strike_price: string;
//   expiration: Date;
//   size: string;
//   contract: "CALL" | "PUT";
// };

export type GreenOrRedWidgetProps = {
  amount: string;
  percentage: Number;
};

export type TopGainersRowProps = {
  item: {
    symbol: string;
    contract: "CALL" | "PUT";
    premium: string;
  };
  width: {
    number: number;
    string: string;
  };
  isActive?: boolean;
};

export const defaultColumns = [
  { accessorKey: "b: Time", header: "Time" },
  { accessorKey: "a: Symbol", header: "Ticker" },
  { accessorKey: "e: Exp Date", header: "Expiration" },
  { accessorKey: "d: Strike", header: "Strike Price" },
  { accessorKey: "c: C/P", header: "Contract" },
  { accessorKey: "g: Size", header: "Size" },
  { accessorKey: "h: Price", header: "Price" },
  { accessorKey: "trade_value", header: "Premium" },
  { accessorKey: "f: Side", header: "Execution" },
  { accessorKey: "j: DTE", header: "DTE" },
  // ... Define other columns similarly
];

// types/MyContextType.ts
export interface ApiContextType {
  state: any; // Replace 'any' with a more specific type for your state
  updateContext: (newState: any) => void; // Again, replace 'any' with the specific type
}
