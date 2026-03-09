export interface AddOnOption {
  label: string;
  originalPrice: number;
  price: number;
}

export interface AddOn {
  name: string;
  originalPrice: number;
  price: number;
  description: string;
  options?: AddOnOption[];
}

export const addOns: AddOn[] = [
  {
    name: "Drone Shoot",
    originalPrice: 12999,
    price: 7999,
    description: "Stunning aerial views of your venue and event.",
  },
  {
    name: "LED Screen (8x12)",
    originalPrice: 19999,
    price: 9999,
    description:
      "Large high-definition LED wall to display live feeds and videos.",
  },
  {
    name: "Ring Ceremony",
    originalPrice: 24999,
    price: 11999,
    description:
      "Complete coverage of your Ring Ceremony with dedicated photographers.",
  },
  {
    name: "Candid Photography",
    originalPrice: 19999,
    price: 11999,
    description:
      "Per Day. Capture the raw, unfiltered emotions and natural moments of your big day.",
  },
  {
    name: "Cinematic Videography",
    originalPrice: 24999,
    price: 12499,
    description:
      "Per Day. A movie-like retelling of your event with high-end equipment.",
  },
  {
    name: "Live Stream on YouTube",
    originalPrice: 14999,
    price: 9999,
    description:
      "Let your distant friends and family join your celebration in real-time.",
  },
  {
    name: "Pre-Wedding Shoot",
    originalPrice: 39999,
    price: 24999,
    description:
      "A romantic photoshoot capturing your chemistry before the big day.",
  },
  {
    name: "Baby Shoot Programme",
    originalPrice: 19999,
    price: 9999,
    description:
      "Adorable and creative portraits preserving your baby's milestones.",
  },
  {
    name: "Birthday Programme",
    originalPrice: 19999,
    price: 9999,
    description:
      "Fun and vibrant coverage of your child's or loved one's birthday party.",
  },
  {
    name: "Kua Poojan",
    originalPrice: 19999,
    price: 9999,
    description:
      "Traditional and beautiful documentation of your Kua Poojan ceremony.",
  },
  {
    name: "LED Screen (43 inches)",
    originalPrice: 7999,
    price: 2999,
    description:
      "Live view of your entire event displayed brilliantly on 43-inch LED screen for all guests to see.",
    options: [
      { label: "1 Screen", originalPrice: 7999, price: 2999 },
      { label: "2 Screens", originalPrice: 14999, price: 4999 },
    ],
  },
];

export function getDiscountPercentage(
  original: number,
  current: number,
): number {
  return Math.round(((original - current) / original) * 100);
}
