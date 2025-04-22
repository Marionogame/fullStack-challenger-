interface IValue {
  value: number;
  percentage: number;
  datetime: Date;
}

interface IContentItem {
  type: string;
  id: string;
  groupId: string;
  attributes: {
    title: string;
    description: string | null;
    color: string | null;
    icon: string | null;
    type: string;
    magnitude: string | null;
    composite: boolean;
    lastUpdate: Date;
    values: IValue[];
    total: number;
    totalPercentage: number;
  };
}

export interface IIncluded {
  type: string;
  id: string;
  attributes: {
    title: string;
    lastUpdate: Date;
    description: string | null;
    magnitude: string | null;
    content: IContentItem[];
  };
}

export interface IData {
  type: string;
  id: string;
  attributes: {
    title: string;
    lastUpdate: Date;
    description: string;
  };
  meta: {
    cacheControl: {
      cache: string;
      expireAt: Date;
    };
  };
}

export interface ReeInterface {
  id: string;
  title: string;
  attributes: IAttributes[];
  __typename?: string;
}

export interface IAttributes {
  color: string | null;
  total: number;
  type: string;
}
export interface IAttributesChart {
  color: string[];
  total: number[];
  type: string[];
}
export interface IRee {
  data: IData;
  included: IIncluded[];
  updatedAt: Date;
  createdAt: Date;
  _id: string;
}
