export type DatatableRowProps = {
  date_and_time: String; // "b: Time" -
  symbol: String; // "a: Symbol" -
  expiration_date: String; // "e: Exp Date" -
  strike_price: String; // "d: Strike" -
  contract: "CALL" | "PUT"; // "c: C/P" -
  size: String; // "g: Size" -
  price: String; // "h: Price" -
  premium: String; // "trade_value" -
  execution: "BID" | "MID" | "ASK"; // "f: Side" -
  DTE: String; // "j: DTE" -
};

export type DatatableProps = {
  data: Object;
};

export type TopPurchasesRowProps = {
  symbol: String;
  strike_price: String;
  expiration: Date;
  size: String;
  contract: "CALL" | "PUT";
};

export type GreenOrRedWidgetProps = {
  amount: String;
  percentage: Number;
};

export type TopGainersRowProps = {
  item: {
    symbol: String;
    contract: "CALL" | "PUT";
    premium: String;
  };
  width: number;
  isActive?: boolean;
};
