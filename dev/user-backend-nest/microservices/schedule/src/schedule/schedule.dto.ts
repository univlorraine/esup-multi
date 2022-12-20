export interface UserScheduleQueryDto {
  username: string;
  startDate: string;
  endDate: string;
}

export interface Schedule {
  messages: [Message?];
  plannings?: Plannings[];
};

export interface Message {
  level: string;
  code: string;
  text: string;
};

export interface Plannings {
  id: string;
  label: string;
  default: boolean;
  type: string;
  messages: [
    {
      level: string;
      text: string

    }
  ];
  events?: Event[];
};

export interface Event {
  id: string;
  startDateTime: string;
  endDateTime: string;
  course : {
    id: string;
    label: string;
    color: string;
    type: string;
    online: boolean;
    url?: string
  };
  rooms: [
    {
      id: string;
      label: string;
      type: string
    }
  ];
  teachers: [
    {
      id: string;
      firstname: string;
      lastname: string;
      email: string
    }
  ];
  groups: [
    {
      id: string;
      label: string
    }
  ];
}
