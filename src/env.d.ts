/* eslint-disable @typescript-eslint/no-explicit-any */
declare const module: any;

declare module "*.png" {
  const value: string;
  export = value;
}

declare module "*.jpg" {
  const value: string;
  export = value;
}

declare module "*.jpeg" {
  const value: string;
  export = value;
}

declare module "*.gif" {
  const value: string;
  export = value;
}

declare module "*.svg" {
  const value: string;
  export = value;
}

declare module "*.css" {
  const value: { [x: string]: string };
  export = value;
}
