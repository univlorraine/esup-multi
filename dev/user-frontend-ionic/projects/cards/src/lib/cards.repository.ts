import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

const STORE_NAME = 'cards';

export interface UserAndCardsProps {
  userAndCardsData: UserAndCardsData;
}

export interface UserAndCardsData {
  lastname: string;
  firstname: string;
  birthdate: Date;
  gender: string;
  photo: string;
  ine?: number;
  affiliation: string;
  errors: [];
  cards?: {
    studentCard?: StudentCard;
    euStudentCard?: EuStudentCard;
    staffCard?: StaffCard;
  };
}

interface Card {
  idNumber: string;
  title: string;
  subtitle?: string;
  endDate: number;
  qrCode?: {
    type: string;
    value: string;
  };
}

interface StudentCard extends Card {
  csn: string;
}

interface EuStudentCard extends Card {
  escn: string;
  euid: string;
}

interface StaffCard extends Card {
  csn: string;
}

const userAndCardsStore = createStore(
    { name: STORE_NAME },
    withProps<UserAndCardsProps>({ userAndCardsData: null})
  );

export const persist = persistState(userAndCardsStore, {
    key: STORE_NAME,
    storage: localForageStore,
});

export const userAndCardsData$ = userAndCardsStore.pipe(select((state) => state.userAndCardsData));

export const setUserAndCardsData = (userAndCardsData: UserAndCardsProps['userAndCardsData']) => {
  userAndCardsStore.update((state) => ({
    ...state,
    userAndCardsData,
  }));
};

export const clearUserAndCardsData = () => userAndCardsStore.reset();
