import axios from 'axios';
import {Keyword} from '../types/Keyword';
import {USE_DUMMY} from '../constants/env.ts';
import {dummyTextKeywords} from './dummy/keyword.ts';

export const getPurposes = async (): Promise<Keyword[]> => {
  if (USE_DUMMY) {
    return dummyTextKeywords;
  }

  try {
    const {data} = await axios.get<{purposes: Keyword[]}>('/purposes');
    return data.purposes;
  } catch (e) {
    console.error(e);
    return [];
  }
};
