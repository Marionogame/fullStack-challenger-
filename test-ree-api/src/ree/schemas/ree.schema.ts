import { Schema } from 'mongoose';

const ValueSchema = new Schema({
  value: { type: Number, required: true },
  percentage: { type: Number, required: true },
  datetime: { type: Date, required: true },
});

const ContentSchema = new Schema({
  type: { type: String, required: true },
  id: { type: String, required: true },
  groupId: { type: String, required: true },
  attributes: {
    title: { type: String, required: true },
    description: { type: String, default: null },
    color: { type: String, default: null },
    icon: { type: String, default: null },
    type: { type: String, default: 'distinct' },
    magnitude: { type: String, default: null },
    composite: { type: Boolean, default: false },
    'last-update': { type: Date, required: true },
    values: [ValueSchema],
    total: { type: Number, required: true },
    'total-percentage': { type: Number, required: true },
  },
});

// Meta schema
const MetaSchema = new Schema({
  'cache-control': {
    cache: { type: String, required: true },
    expireAt: { type: Date, default: null },
  },
});

export const ReeSchemas = new Schema(
  {
    data: {
      type: { type: String, required: true },
      id: { type: String, required: true },
      attributes: {
        title: { type: String, required: true },
        'last-update': { type: Date, required: true },
        description: { type: String, required: true },
      },
      meta: MetaSchema,
    },
    included: [
      {
        type: { type: String, required: true },
        id: { type: String, required: true },
        attributes: {
          title: { type: String, required: true },
          'last-update': { type: Date, required: true },
          description: { type: String, default: null },
          magnitude: { type: String, default: null },
          content: [ContentSchema],
        },
      },
    ],
  },
  { timestamps: true },
);
