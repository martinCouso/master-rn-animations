import images from '../../assets/images';
import {CARD_WIDTH} from './styles/KittenCardsScreenStyles';

export const CATS = [
  {
    image: images.cat1,
    id: 1,
    text: 'Sweet Cat',
  },
  {
    image: images.cat2,
    id: 2,
    text: 'Sweeter Cat2',
  },
  {
    image: images.cat3,
    id: 3,
    text: 'Sweetest Cat3',
  },
  {
    image: images.cat4,
    id: 4,
    text: 'Aww4',
  },
];
export const SWIPE_THRESHOLD = CARD_WIDTH / 1.5;
