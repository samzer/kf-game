export const investorNames = [
    "Alice Johnson",
    "Bob Smith",
    "Carol Brown",
    "David Williams",
    "Eve Davis",
    "Frank Garcia",
    "Grace Martinez",
    "Harry Miller",
    "Ivy Wilson",
    "Jack Moore",
    "Kathy Taylor",
    "Liam Anderson",
    "Mary Thomas",
    "Nathan Jackson",
    "Olivia White",
    "Paul Harris",
    "Queenie Martin",
    "Robert Thompson",
    "Sophia Lee",
    "Tyler Gonzalez",
  ];
  
export const generateLevel = (i) => {
    const random = Math.round(Math.random());

    return {
      smallBusiness: {
        name: `Small Business ${i + 1}`,
        inventoryNeeds: (i + 1) * 1000,
        preferredInterestRate: 0.05 + (i % 5) * 0.01,
        preferredTimeline: 3 + (i % 12),
      },
      potentialInvestors: [
        {
          name: investorNames[i * 3],
          investmentSize: (i + 1) * 1000 + (i % 3) * 1000,
          interestRate: 0.05 + (i % 5) * 0.01,
          timeline: 3 + (i % 12),
        },
        {
          name: investorNames[i * 3 + 1],
          investmentSize: (i + 1) * 1000 + (i % 3) * 2000,
          interestRate: 0.06 + (i % 5) * 0.01,
          timeline: 4 + (i % 12),
        },
        {
          name: investorNames[i * 3 + 2],
          investmentSize: (i + 1) * 1000 + (i % 3) * 3000,
          interestRate: 0.07 + (i % 5) * 0.01,
          timeline: 5 + (i % 12),
        },
      ],
    };
  };
  
  export const initialLevels = Array.from({ length: 20 }, (_, i) => generateLevel(i));