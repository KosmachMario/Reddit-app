import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const expandCollapseAnimation = trigger('expandCollapse', [
  state(
    'collapsed',
    style({
      height: '0',
      opacity: '0',
    })
  ),
  state(
    'expanded',
    style({
      height: '*',
      opacity: '1',
    })
  ),
  transition('expanded <=> collapsed', [animate('200ms ease-in-out')]),
  transition('void => expanded', [
    style({ height: '0', opacity: '0' }),
    animate('200ms ease-in-out'),
  ]),
]);
