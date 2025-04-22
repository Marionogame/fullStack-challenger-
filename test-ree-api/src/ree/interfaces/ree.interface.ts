import { Schema, Document } from 'mongoose';

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

const ValueSchema = new Schema<IValue>({
  value: { type: Number, required: true },
  percentage: { type: Number, required: true },
  datetime: { type: Date, required: true },
});

const ContentItemSchema = new Schema<IContentItem>({
  type: { type: String, required: true },
  id: { type: String, required: true },
  groupId: { type: String, required: true },
  attributes: {
    title: { type: String, required: true },
    description: { type: String, default: null },
    color: { type: String, default: null },
    icon: { type: String, default: null },
    type: { type: String, required: true },
    magnitude: { type: String, default: null },
    composite: { type: Boolean, required: true },
    lastUpdate: { type: Date, required: true },
    values: { type: [ValueSchema], required: true },
    total: { type: Number, required: true },
    totalPercentage: { type: Number, required: true },
  },
});
