import {trigger, state, style, transition, animate, AnimationEntryMetadata} from '@angular/core';

let animationDuration: number = 0.5;
let animationEasing: string = 'ease-in-out';
let animationEnterEasing: string = animationDuration + 's ' + animationDuration + 's ' + animationEasing;
let animationExitEasing: string = animationDuration + 's ' + animationEasing;

export const flyInOut: AnimationEntryMetadata = trigger('flyInOut', [
  state('void', style({position:'absolute'}) ),
  state('*', style({position:'absolute'}) ),
  transition(':enter', [  // before 2.1: transition('void => *', [
    style({transform: 'translateX(100%)', opacity: 0}),
    animate(animationEnterEasing, style({transform: 'translateX(0%)', opacity: 1}))
  ]),
  transition(':leave', [  // before 2.1: transition('* => void', [
    style({transform: 'translateX(0%)', opacity: 1}),
    animate(animationExitEasing, style({transform: 'translateX(-100%)', opacity: 0}))
  ])
]);

export const fadeInOut: AnimationEntryMetadata = trigger('fadeInOut', [
  state('void', style({position:'absolute'}) ),
  state('*', style({position:'absolute'}) ),
  transition(':enter', [  // before 2.1: transition('void => *', [
    style({opacity: 0}),
    animate(animationEnterEasing, style({opacity: 1}))
  ]),
  transition(':leave', [  // before 2.1: transition('* => void', [
    style({transform: 'translateX(0%)', opacity: 1}),
    animate(animationExitEasing, style({opacity: 0}))
  ])
]);

export const fadeInOutNoDelay: AnimationEntryMetadata = trigger('fadeInOutNoDelay', [
  // state('void', style({position:'fixed'}) ),
  // state('*', style({position:'fixed'}) ),
  transition(':enter', [  // before 2.1: transition('void => *', [
    style({opacity: 0}),
    animate(animationExitEasing, style({opacity: 1}))
  ]),
  transition(':leave', [  // before 2.1: transition('* => void', [
    style({transform: 'translateX(0%)', opacity: 1}),
    animate(animationExitEasing, style({opacity: 0}))
  ])
]);

export const fadeInNoDelay: AnimationEntryMetadata = trigger('fadeInNoDelay', [
  state('void', style({position:'absolute'}) ),
  state('*', style({position:'absolute'}) ),
  transition(':enter', [  // before 2.1: transition('void => *', [
    style({opacity: 0}),
    animate(animationExitEasing, style({opacity: 1}))
  ])
]);

export const flyInOutRight: AnimationEntryMetadata = trigger('flyInOutRight', [
  transition(':enter', [  // before 2.1: transition('void => *', [
    style({transform: 'translateX(100%)', opacity: 0}),
    animate(animationEnterEasing, style({transform: 'translateX(0%)', opacity: 1}))
  ]),
  transition(':leave', [  // before 2.1: transition('* => void', [
    style({transform: 'translateX(0%)', opacity: 1}),
    animate(animationExitEasing, style({transform: 'translateX(100%)', opacity: 0}))
  ])
]);

export const slideUpDownNoDelay: AnimationEntryMetadata = trigger('slideUpDownNoDelay', [
  // state('void', style({transform: 'translateY(100%)'})),
  // state('*', style({transform: 'translateY(0%)'})),
  transition(':enter', [  // before 2.1: transition('void => *', [
    style({transform: 'translateX(-100%)'}),
    animate('1000ms linear', style({transform: 'translateX(0%)'}))
  ]),
  transition(':leave', [  // before 2.1: transition('* => void', [
    style({transform: 'translateX(0%)'}),
    animate('1000ms linear', style({transform: 'translateX(-100%)'}))
  ])
]);
