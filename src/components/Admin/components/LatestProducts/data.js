import uuid from 'uuid/v1';
import moment from 'moment';

export default [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: '/images/temp/product_1.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Medium  Corporation',
    imageUrl: '/images/temp/product_2.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/images/temp/product_3.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/images/temp/product_4.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'Github',
    imageUrl: '/images/temp/product_5.png',
    updatedAt: moment().subtract(9, 'hours')
  }
];
