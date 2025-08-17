export type LifeStatus = 'Alive' | 'Dead' | 'unknown' | string;

export function getStatusDotClass(status: LifeStatus): string {
  switch (status) {
    case 'Alive':
      return 'bg-[hsl(140,70%,45%)]';
    case 'Dead':
      return 'bg-[hsl(0,70%,50%)]';
    default:
      return 'bg-[hsl(0,0%,50%)]';
  }
}
