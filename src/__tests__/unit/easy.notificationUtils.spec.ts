import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  const event: Event[] = [
    {
      title: '이벤트 2',
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
      title: '이벤트 3',
      date: '2025-02-05',
      startTime: '18:30',
      endTime: '20:30',
      description: '술약속',
      location: '사당',
      category: '기타',
      repeat: {
        type: 'none',
        interval: 5,
      },
      notificationTime: 10,
      id: '2',
    },
  ];
  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const result = getUpcomingEvents(event, new Date('2025-02-03T18:20:00'), []);
    expect(result).toEqual([event[0]]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const alarm = [event[0].id, event[1].id];
    const result = getUpcomingEvents(event, new Date('2025-02-03T18:25:00'), alarm);
    expect(result).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const alarm = [event[0].id, event[1].id];
    const result = getUpcomingEvents(event, new Date('2025-02-03T10:00:00'), alarm);
    expect(result).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const alarm = [event[0].id, event[1].id];
    const result = getUpcomingEvents(event, new Date('2025-02-06T10:00:00'), alarm);
    expect(result).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event[] = [
      {
        title: '이벤트 2',
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
        title: '이벤트 3',
        date: '2025-02-05',
        startTime: '18:30',
        endTime: '20:30',
        description: '술약속',
        location: '사당',
        category: '기타',
        repeat: {
          type: 'none',
          interval: 5,
        },
        notificationTime: 10,
        id: '2',
      },
    ];
    const result = createNotificationMessage(event[0]);
    expect(result).toBe(`10분 후 이벤트 2 일정이 시작됩니다.`);
  });
});
