import { Document } from 'mongoose';

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

interface IIncluded {
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

interface IData {
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
      expireAt: Date | null;
    };
  };
}

export interface IRee extends Document {
  data: IData;
  included: IIncluded[];
  createdAt: Date;
  updatedAt: Date;
}
