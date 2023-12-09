export type DatatableRowProps = {
  date_and_time: string; // "b: Time" -
  symbol: string; // "a: Symbol" -
  expiration_date: string; // "e: Exp Date" -
  strike_price: string; // "d: Strike" -
  contract: "CALL" | "PUT"; // "c: C/P" -
  size: string; // "g: Size" -
  price: string; // "h: Price" -
  premium: string; // "trade_value" -
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
  width: number;
  isActive?: boolean;
};
