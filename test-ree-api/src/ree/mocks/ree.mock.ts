import { IRee } from '../../ree/interfaces/ree.interface';
import { CreateReeInputDTO } from '../../ree/dto/ree.input.dto';

export const mockModel = {
  create: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
};
export const mockSample: Partial<IRee>[] = [
  {
    _id: 'mockId123',
    data: {
      type: 'test',
      id: '123',
      attributes: {
        title: 'Mock Title',
        lastUpdate: new Date('2025-01-01'),
        description: 'Mock Description',
      },
      meta: {
        cacheControl: {
          cache: 'mockCache',
          expireAt: new Date('2025-05-01'),
        },
      },
    },
    included: [],
    createdAt: new Date('2025-01-01T10:00:00Z'),
    updatedAt: new Date('2025-01-02T10:00:00Z'),
  },
];
export const mockcreateReeInputDTO: CreateReeInputDTO = {
  data: {
    type: 'test',
    id: '123',
    attributes: {
      title: 'Mock Title',
      lastUpdate: new Date('2025-01-01'),
      description: 'Mock Description',
    },
    meta: {
      cacheControl: {
        cache: 'mockCache',
        expireAt: new Date('2025-05-01'),
      },
    },
  },
  createdAt: new Date('2025-01-01T10:00:00Z'),
  updatedAt: new Date('2025-01-02T10:00:00Z'),
};

// export const mockSample = {
//   data: {
//     type: 'mockType',
//     id: 'mockId',
//     attributes: {
//       title: 'Mock Title',
//       lastUpdate: new Date('2025-04-01'),
//       description: 'Mock Description',
//     },
//     meta: {
//       cacheControl: {
//         cache: 'mockCache',
//         expireAt: new Date('2025-05-01'),
//       },
//     },
//   },
//   included: [
//     {
//       type: 'mockIncludedType',
//       id: 'mockIncludedId',
//       attributes: {
//         title: 'Mock Included Title',
//         lastUpdate: new Date('2025-04-01'),
//         description: 'Mock Included Description',
//         magnitude: 'mockMagnitude',
//         content: [
//           {
//             type: 'mockContentType',
//             id: 'mockContentId',
//             groupId: 'mockGroupId',
//             attributes: {
//               title: 'Mock Content Title',
//               description: 'Mock Content Description',
//               color: 'mockColor',
//               icon: 'mockIcon',
//               type: 'mockType',
//               magnitude: 'mockMagnitude',
//               composite: true,
//               lastUpdate: new Date('2025-04-01'),
//               values: [
//                 {
//                   value: 100,
//                   percentage: 50,
//                   datetime: new Date('2025-04-01T10:00:00Z'),
//                 },
//               ],
//               total: 200,
//               totalPercentage: 100,
//             },
//           },
//         ],
//       },
//     },
//   ],
//   createdAt: new Date('2025-04-01T10:00:00Z'),
//   updatedAt: new Date('2025-04-02T10:00:00Z'),
// };
