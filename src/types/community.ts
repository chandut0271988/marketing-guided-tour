export type Point2 = readonly [x: number, z: number];
export type Point3 = [x: number, y: number, z: number];
export type WingId =
  | "60"
  | "61"
  | "62"
  | "63"
  | "64"
  | "65"
  | "66"
  | "67"
  | "68"
  | "69"
  | "70"
  | "71";

export interface WingData {
  id: WingId;
  position: Point3;
  rotation: number;
  width: number;
  depth: number;
  floors: number;
  heightPerFloor: number;
  groundHeight: number;
  facade: string;
  modelUrl?: string;
}

export interface RouteData {
  id: string;
  points: readonly Point2[];
  width: number;
  closed?: boolean;
}

export type ViewMode = "aerial" | "plan";
export type CameraCommand =
  | { type: "overview"; view: ViewMode; key: number }
  | { type: "wing"; id: WingId; view: ViewMode; key: number }
  | { type: "zoom"; amount: number; key: number }
  | { type: "orbit"; azimuth: number; polar: number; key: number };
