import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getAllTextsInOrderOfAppearanceContainingAnyOf } from '../../../__utils__/testing-queries-helpers';

import { List } from './List';

// TODO: fix the tests by fixing the production code; the tests shouldn't be touched
// hint: useState - how to update state dependent on previous state

test('add entry', () => {
  render(<List/>);

  userEvent.paste(screen.getByRole('textbox'), 'a');
  const button = screen.getByRole('button', { name: 'Add entry' });
  button.click();
  userEvent.clear(screen.getByRole('textbox'));

  expect(screen.getByText('a')).toBeInTheDocument();
});

test('add multiple entries', async () => {
  render(<List/>);
  const entries = ['entry 1', 'entry 2', 'entry 3'];

  const input = screen.getByRole('textbox');
  const addEntryButton = screen.getByRole('button', { name: 'Add entry' });
  for (const entry of entries) {
    userEvent.paste(input, entry);
    addEntryButton.click();
    userEvent.clear(input);
  }
  await waitFor(() => expect(getAllTextsInOrderOfAppearanceContainingAnyOf(entries)).toEqual(entries));
});


test('remove entry', async () => {
  render(<List/>);
  const entries = ['entry 1', 'entry 2', 'entry 3'];
  const expectedEntries = ['entry 1', 'entry 3'];

  const input = screen.getByRole('textbox');
  const addEntryButton = screen.getByRole('button', { name: 'Add entry' });
  for (const entry of entries) {
    userEvent.paste(input, entry);
    addEntryButton.click();
    userEvent.clear(input);
  }

  const [, removeSecondEntryButton] = screen.getAllByRole('button', { name: 'Remove entry' });
  removeSecondEntryButton.click();

  await waitFor(() => expect(getAllTextsInOrderOfAppearanceContainingAnyOf(expectedEntries)).toEqual(expectedEntries));
});

test('sort entries', async () => {
  render(<List/>);
  const entries = ['d', 'c', 'a'];
  const expectedSortedEntries = ['a', 'c', 'd'];

  const input = screen.getByRole('textbox');
  const addEntryButton = screen.getByRole('button', { name: 'Add entry' });
  for (const entry of entries) {
    userEvent.paste(input, entry);
    addEntryButton.click();
    userEvent.clear(input);
  }

  screen.getByRole('button', { name: 'Sort entries' }).click();

  await waitFor(() => expect(getAllTextsInOrderOfAppearanceContainingAnyOf(expectedSortedEntries)).toEqual(expectedSortedEntries));
});

test('add entry and sort', async () => {
  render(<List/>);
  const entries = ['d', 'c', 'a'];
  const expectedSortedEntries = ['a', 'b', 'c', 'd'];

  const input = screen.getByRole('textbox');
  const addEntryButton = screen.getByRole('button', { name: 'Add entry' });
  for (const entry of entries) {
    userEvent.paste(input, entry);
    addEntryButton.click();
    userEvent.clear(input);
  }

  userEvent.paste(input, 'b');
  screen.getByRole('button', { name: 'Add entry and sort' }).click();

  await waitFor(() => expect(getAllTextsInOrderOfAppearanceContainingAnyOf(expectedSortedEntries)).toEqual(expectedSortedEntries));
});