import {
  TypedUseSelectorHook,
  useSelector as useSelectorRaw,
} from 'react-redux';
import { Store } from '../modules/store';

const useSelector: TypedUseSelectorHook<Store> = useSelectorRaw;

export { useSelector };
