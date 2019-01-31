import { toast } from 'react-toastify';
import * as lang from './langService';

export const error = () => {
  toast.error(lang.get('messages.error'));
};

export const success = name => {
  toast.success(lang.get(name));
};