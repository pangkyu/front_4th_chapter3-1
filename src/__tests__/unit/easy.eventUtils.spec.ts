import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
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
      date: '2024-07-01',
      startTime: '18:30',
      endTime: '20:30',
      description: '이벤트 3',
      location: '강남',
      category: '기타',
      repeat: {
        type: 'weekly',
        interval: 5,
      },
      notificationTime: 10,
      id: '2',
    },
    {
      title: '이벤트 Event',
      date: '2024-07-15',
      startTime: '08:30',
      endTime: '16:30',
      description: '이벤트 4',
      location: '광화문',
      category: '기타',
      repeat: {
        type: 'weekly',
        interval: 5,
      },
      notificationTime: 10,
      id: '3',
    },
  ];
  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const result = getFilteredEvents(event, '이벤트 2', new Date(event[0].date), 'week');
    expect(result).toEqual([event[0]]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const result = getFilteredEvents(event, '', new Date(event[1].date), 'week');
    expect(result).toEqual([event[1]]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const result = getFilteredEvents(event, '', new Date('2024-07'), 'month');
    expect(result).toEqual([event[1], event[2]]);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const result = getFilteredEvents(event, '이벤트', new Date(event[2].date), 'week');
    expect(result).toEqual([event[2]]);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const result = getFilteredEvents(event, '', new Date('2024-07-01'), 'month');
    expect(result).toEqual([event[1], event[2]]);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const result = getFilteredEvents(event, 'event', new Date(event[2].date), 'week');
    expect(result).toEqual([event[2]]);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    const result1 = getFilteredEvents(event, '', new Date('2024-06-30'), 'month');
    const result2 = getFilteredEvents(event, '', new Date('2024-06-30'), 'week');
    expect(result1).toEqual([]);
    expect(result2).toEqual([event[1]]);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const result = getFilteredEvents([], '', new Date(event[0].date), 'month');
    expect(result).toEqual([]);
  });
});
