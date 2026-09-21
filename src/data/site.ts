import type { Point2, RouteData } from "../types/community";

export const site = {
  areaAcres: 6.28,
  residences: 683,
  wingCount: 12,
  // All coordinates are a hand-traced interpretation of masterplan.jpg.
  boundary: [
    [-69, -102],
    [25, -102],
    [40, -84],
    [40, -39],
    [45, -20],
    [65, 4],
    [94, 10],
    [134, 10],
    [136, 32],
    [113, 58],
    [92, 84],
    [76, 117],
    [34, 103],
    [-58, 102],
    [-69, 91],
  ] satisfies Point2[],
  forest: [
    [30, -85],
    [36, -84],
    [36, -38],
    [42, -18],
    [61, 7],
    [94, 14],
    [131, 14],
    [131, 30],
    [109, 58],
    [88, 83],
    [73, 112],
    [48, 102],
    [34, 89],
    [60, 73],
    [60, 25],
    [29, 25],
  ] satisfies Point2[],
  water: [
    [36, 98],
    [43, 89],
    [48, 84],
    [54, 80],
    [58, 72],
    [64, 67],
    [66, 72],
    [63, 84],
    [58, 96],
    [52, 106],
  ] satisfies Point2[],
  lawns: [
    {
      id: "activity",
      points: [
        [29, -78],
        [34, -82],
        [36, -72],
        [35, -43],
        [29, -38],
      ],
    },
    {
      id: "celebration",
      points: [
        [29, -33],
        [37, -33],
        [41, -16],
        [57, 3],
        [29, 17],
      ],
    },
    {
      id: "camping",
      points: [
        [89, 24],
        [124, 22],
        [111, 43],
        [98, 51],
        [83, 43],
      ],
    },
  ] satisfies { id: string; points: Point2[] }[],
  gardenBeds: [-73, -37, -1, 35, 71],
  contextRoads: [
    {
      id: "context-west-road",
      points: [
        [-79, -119],
        [-79, 112],
      ],
      width: 12,
    },
    {
      id: "context-north-road",
      points: [
        [-79, -110],
        [43, -110],
      ],
      width: 12,
    },
  ] satisfies RouteData[],
  pavingPads: [
    {
      id: "detached-wing-court",
      position: [44, 0.09, 49],
      size: [30, 0.16, 41],
    },
  ],
  roads: [
    {
      id: "internal-loop",
      points: [
        [-62, -87],
        [-60, -96],
        [14, -96],
        [19, -87],
        [19, 91],
        [12, 97],
        [-54, 95],
        [-62, 86],
      ],
      width: 6,
      closed: true,
    },
    {
      id: "wing-71-access",
      points: [
        [19, 26],
        [59, 26],
        [62, 32],
        [62, 70],
        [55, 75],
        [19, 75],
      ],
      width: 5,
    },
    {
      id: "south-entry",
      points: [
        [19, 89],
        [30, 92],
        [35, 99],
      ],
      width: 6,
    },
    {
      id: "north-entry",
      points: [
        [-76, -96],
        [-60, -96],
      ],
      width: 6,
    },
    {
      id: "west-exit",
      points: [
        [-76, 94],
        [-57, 94],
      ],
      width: 6,
    },
  ] satisfies RouteData[],
  paths: [
    {
      id: "garden-west",
      points: [
        [-29, -92],
        [-29, 92],
      ],
      width: 1.6,
    },
    {
      id: "garden-east",
      points: [
        [-15, -92],
        [-15, 92],
      ],
      width: 1.6,
    },
    {
      id: "forest-edge",
      points: [
        [29, 20],
        [27, -36],
        [28, -77],
        [32, -86],
        [37, -78],
        [38, -40],
        [42, -17],
        [61, 6],
        [96, 17],
        [127, 19],
        [127, 30],
        [105, 59],
        [86, 85],
        [72, 108],
      ],
      width: 1.8,
    },
    {
      id: "serenity-loop",
      points: [
        [29, 20],
        [59, 10],
        [77, 26],
        [73, 43],
        [82, 60],
        [75, 76],
        [63, 96],
        [62, 105],
      ],
      width: 1.8,
    },
    {
      id: "valley-loop",
      points: [
        [74, 32],
        [64, 40],
        [67, 56],
        [77, 61],
        [86, 51],
        [81, 38],
        [74, 32],
      ],
      width: 1.5,
    },
    {
      id: "cross-forest",
      points: [
        [74, 32],
        [93, 37],
        [104, 52],
      ],
      width: 1.5,
    },
    {
      id: "water-walk",
      points: [
        [31, 91],
        [41, 79],
        [49, 76],
        [60, 64],
        [70, 65],
      ],
      width: 1.6,
    },
    ...[-90, -54, -18, 18, 54, 90].map((z) => ({
      id: `garden-cross-${z}`,
      points: [
        [-32, z],
        [-12, z],
      ] as Point2[],
      width: 1.5,
    })),
  ] satisfies RouteData[],
  cameraBounds: { min: [-90, 0, -120], max: [145, 55, 125] },
};

export const landscapeLabels = [
  { name: "Central gardens", position: [-22, 1, -5] },
  { name: "Forestscape", position: [104, 1, 25] },
  { name: "Water garden", position: [64, 1, 99] },
] satisfies { name: string; position: [number, number, number] }[];
