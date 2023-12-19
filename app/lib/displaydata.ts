import { TopGainersRowProps } from "./types";

export const logoImgPath = "/logo.png";
export const businessName = "Alert Algo";
export const discordUrl = "https://discord.gg/W7Uund2DyV";

export const NavbarLinks = [
  { link_text: "Home", href: "/#home" },
  { link_text: "Features", href: "/#features" },
  { link_text: "Pricing", href: "/#pricing" },
];
export const HeroSectionData = {
  sub: "Stop overpaying for market data and become a member now. Starting at only $14.99 a month ",
};
export const OptionsFlowSectionData = {
  sub: "Real-time data  with advanced features, Discover what contracts individuals are buying/selling ",
  imageUrl: "/DataTable.png",
  bubble1_title: "Instant Order Alerts",
  bubble1_text: "Receive automatic alerts of when to Buy and Sell",
  bubble2_title: "Accessibility",
  bubble2_text: "Navigate and access our data with ease",
};
export const FeaturesSectionData = {
  sub: "Some features require a premium membership, others only require an account.",
  imageUrl: "/Category.png",
};
export const HistoricalFlowSectionData = {
  sub: "Some features require a premium membership, others only require an account.",
  imageUrl: "/historicalflow.png",
};
export const TrackTradesSectionData = {
  sub: "Our systems analyze every trade & constantly scan their prices to compare the live prices of contracts to the point it was bought/sold at.",
  imageUrl: "/flow.png",
};
export const MembershipSectionData = {
  diamond_image_url: "/diamond.png",
  memberships: [
    {
      title: "Monthly",
      price: "$14.99",
      benefits: [
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
      ],
    },
    {
      title: "Yearly",
      price: "$100",
      benefits: [
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
      ],
    },
    {
      title: "Lifetime",
      price: "$250",
      benefits: [
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
        "Benefit one lorem ipsum dolor sit amet",
      ],
    },
  ],
};
export const DiscordSectionData = {
  sub: "Connect with other traders and ask questions in our Discord Communty. On joining, you can choose one option to stream data for, for free!",
  imageUrl: "/white-discord.svg",
};
export const FooterData = {
  paragraph:
    "Massa blandit semper varius faucibus. Suspendisse viverra venenatis placerat nam ut. Pellentesque sit id tempor turpis.",
  columns: [
    {
      columnTitle: "Links",
      columnLinks: [
        { text: "Home", href: "/#" },
        { text: "Features", href: "/#features" },
        { text: "Pricing", href: "/#pricing" },
        { text: "Discord", href: discordUrl },
      ],
    },
  ],
};

export const socialMedias = [
  {
    name: "Youtube",
    imageUrl: "/youtube.svg",
    href: "https://www.youtube.com/@AlphaSweeps",
  },
  {
    name: "Twitter",
    imageUrl: "/twitter.svg",
    href: "#",
  },
  {
    name: "Facebook",
    imageUrl: "/facebook.svg",
    href: "#",
  },
];

export const fakeTopGainersData: TopGainersRowProps[] = [
  {
    item: {
      symbol: "FAKE",
      contract: "CALL",
      premium: "375534680",
    },
    width: { number: 90, string: "w-[90%]" },
  },
  {
    item: {
      symbol: "NVDA",
      contract: "CALL",
      premium: "10180000",
    },
    width: { number: 73, string: "w-[73%]" },
  },
  {
    item: {
      symbol: "MRNA",
      contract: "PUT",
      premium: "8583900",
    },
    width: { number: 66, string: "w-[66%]" },
  },
  {
    item: {
      symbol: "SPX",
      contract: "CALL",
      premium: "7808000",
    },
    width: { number: 57, string: "w-[57%]" },
  },
  {
    item: {
      symbol: "FSLR",
      contract: "PUT",
      premium: "7017500",
    },
    width: { number: 50, string: "w-[50%]" },
  },
  {
    item: {
      symbol: "IWM",
      contract: "PUT",
      premium: "6936960",
    },
    width: { number: 44, string: "w-[44%]" },
  },
  {
    item: {
      symbol: "TSLA",
      contract: "PUT",
      premium: "6019500",
    },
    width: { number: 40, string: "w-[40%]" },
  },
  {
    item: {
      symbol: "QQQ",
      contract: "CALL",
      premium: "4809999",
    },
    width: { number: 33, string: "w-[33%]" },
  },
];

export const fakeHottestOptionsData = [
  {
    calls: 0,
    expiration_date: "2024-03-15",
    puts: 10000,
    strike: "73.00",
    symbol: "HYG",
    total_size: 10000,
  },
  {
    calls: 8150,
    expiration_date: "2024-01-19",
    puts: 0,
    strike: "98.00",
    symbol: "TLT",
    total_size: 8150,
  },
];

export const randomWidths = [
  { number: 90, string: "w-[90%]" },
  { number: 82, string: "w-[82%]" },
  { number: 80, string: "w-[80%]" },
  { number: 70, string: "w-[70%]" },
  { number: 60, string: "w-[60%]" },
  { number: 52, string: "w-[52%]" },
  { number: 33, string: "w-[33%]" },
  { number: 27, string: "w-[27%]" },
];

// Plans data

export const subscriptions = [
  // {
  //   planType: "Free",
  //   price: "$0",
  //   benefits: ["Lorem Ipsum dolor sit amet", "Lorem Ipsum dolor sit amet"],
  //   nonbenefits: [
  //     "Lorem Ipsum dolor sit amet",
  //     "Lorem Ipsum dolor sit amet",
  //     "Lorem Ipsum dolor sit amet",
  //   ],
  // },
  {
    planType: "Monthly",
    price: "$20",
    benefits: [
      "Lorem Ipsum dolor sit amet",
      "Lorem Ipsum dolor sit amet",
      "Lorem Ipsum dolor sit amet",
      "Lorem Ipsum dolor sit amet",
    ],
    nonbenefits: ["Lorem Ipsum dolor sit amet"],
    priceId: "price_1ONATOCJ7W2t3weqWLqxr0hc",
  },
  {
    planType: "Yearly",
    price: "$200",
    benefits: [
      "Lorem Ipsum dolor sit amet",
      "Lorem Ipsum dolor sit amet",
      "Lorem Ipsum dolor sit amet",
      "Lorem Ipsum dolor sit amet",
      "Lorem Ipsum dolor sit amet",
    ],
    nonbenefits: [],
    priceId: "price_1ONAVCCJ7W2t3weqYpKhQ0kd",
  },
];

export const freeSymbol = "SPY";
