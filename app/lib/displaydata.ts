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
  sub: "Connect with other traders and ask questions in our Discord Communty",
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
    width: 100,
  },
  {
    item: {
      symbol: "NVDA",
      contract: "CALL",
      premium: "10180000",
    },
    width: 73,
  },
  {
    item: {
      symbol: "MRNA",
      contract: "PUT",
      premium: "8583900",
    },
    width: 66,
  },
  {
    item: {
      symbol: "SPX",
      contract: "CALL",
      premium: "7808000",
    },
    width: 57,
  },
  {
    item: {
      symbol: "FSLR",
      contract: "PUT",
      premium: "7017500",
    },
    width: 50,
  },
  {
    item: {
      symbol: "IWM",
      contract: "PUT",
      premium: "6936960",
    },
    width: 44,
  },
  {
    item: {
      symbol: "TSLA",
      contract: "PUT",
      premium: "6019500",
    },
    width: 40,
  },
  {
    item: {
      symbol: "QQQ",
      contract: "CALL",
      premium: "4809999",
    },
    width: 33,
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

export const randomWidths = [90, 82, 80, 70, 60, 52, 33, 27];
