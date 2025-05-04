import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTimeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';

    const now = new Date();
    const timestamp = new Date(value).getTime();
    const secondsAgo = Math.floor((now.getTime() - timestamp) / 1000);

    if (secondsAgo < 60) {
      return 'just now';
    }

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(secondsAgo / seconds);
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }

    return 'just now';
  }
}
