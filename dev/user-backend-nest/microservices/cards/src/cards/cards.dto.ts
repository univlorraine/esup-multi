export interface UserCardsDto {
  lastname: string;
  firstname: string;
  birthdate: Date;
  gender: string;
  photo: string;
  ine?: number;
  errors: string[];
  cards: {
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

export interface AuthenticateQueryDto {
  username: string;
}
