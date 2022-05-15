import { screen } from '@testing-library/react';

export const getAllInOrderOfAppearanceContainingAnyOf = (texts: string[]) => screen.getAllByText(new RegExp(`^(${texts.join('|')})`));
export const queryAllInOrderOfAppearanceContainingAnyOf = (texts: string[]) => screen.queryAllByText(new RegExp(`^(${texts.join('|')})`));

export const getAllTextsInOrderOfAppearanceContainingAnyOf = (texts: string[]) => getAllInOrderOfAppearanceContainingAnyOf(texts)
  .map((element) => element.textContent && texts.find(text => element.textContent!.startsWith(text)));

// alternatively one can always use the querySelector(All), but getAllByText is the preferred one
// [...container.querySelectorAll('div')]
//     .map(element => element.innerHTML && texts.find(text => element.innerHTML.startsWith(text)))
//     .filter(text => text);
