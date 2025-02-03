import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    expect(parseDateTime('2024-07-01', '14:30')).toEqual(new Date('2024-07-01 14:30'));
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    expect(parseDateTime('2024-18-35', '14:30')).toEqual(new Date('2024-18-35 14:30'));
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    expect(parseDateTime('2025-02-01', '30:30')).toEqual(new Date('2025-02-01 30:30'));
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    expect(parseDateTime('', '20:20')).toEqual(new Date(' 20:20'));
  });
});

describe('convertEventToDateRange', () => {
  const event: Event[] = [
    {
      title: '산책하기',
      date: '2025-02-03',
      startTime: '18:30',
      endTime: '20:30',
      description: '혜화동 한바퀴 돌기',
      location: '혜화',
      category: '기타',
      repeat: {
        type: 'weekly',
        interval: 5,
      },
      notificationTime: 10,
      id: '1',
    },
    {
      title: '항해 오프라인',
      date: '2025-13-11',
      startTime: '13:00',
      endTime: '18:00',
      description: '항해 오프라인 듣는 날',
      location: '선릉',
      category: '공부',
      repeat: {
        type: 'weekly',
        interval: 10,
      },
      notificationTime: 10,
      id: '2',
    },
    {
      title: '출근하기',
      date: '2025-02-04',
      startTime: '08:30',
      endTime: '26:30',
      description: '출근하자..',
      location: '혜화',
      category: '업무',
      repeat: {
        type: 'daily',
        interval: 5,
      },
      notificationTime: 10,
      id: '3',
    },
  ];
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const result = convertEventToDateRange(event[0]);
    expect(result).toEqual({
      start: new Date(`${event[0].date} ${event[0].startTime}`),
      end: new Date(`${event[0].date} ${event[0].endTime}`),
    });
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const result = convertEventToDateRange(event[1]);
    expect(result).toEqual({
      start: new Date(`${event[1].date} ${event[1].startTime}`),
      end: new Date(`${event[1].date} ${event[1].endTime}`),
    });
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const result = convertEventToDateRange(event[2]);
    expect(result).toEqual({
      start: new Date(`${event[2].date} ${event[2].startTime}`),
      end: new Date(`${event[2].date} ${event[2].endTime}`),
    });
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {});

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {});
});

describe('findOverlappingEvents', () => {
  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {});

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {});
});
