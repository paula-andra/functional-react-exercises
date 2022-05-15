import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import {
  getAllInOrderOfAppearanceContainingAnyOf,
  getAllTextsInOrderOfAppearanceContainingAnyOf,
  queryAllInOrderOfAppearanceContainingAnyOf,
} from '../../../__utils__/testing-queries-helpers';

import { Users } from './Users';
import { UsersProvider } from './components/UsersContext';

// TODO: fix the tests
// hint: to get the current path from root you could use a react router hook https://reactrouter.com/docs/en/v6/getting-started/concepts

// hint: getByLabelText requires a construct like that:
// <label id="username-label">Username</label>
// <input aria-labelledby="username-label" />
// getByLabelText('Username') return the input


const getUserNamesAsSortedTexts = (userNames: string[][]) => userNames.map(names => names.join(' ')).sort();

const addUsers = async (userNames: string[][]) => {
  const addUser = screen.getByRole('button', { name: 'Add user' });
  const firstNameInput = screen.getByLabelText('First name:');
  const lastNameInput = screen.getByLabelText('Last name:');

  for (const userName of userNames) {
    userEvent.clear(firstNameInput);
    userEvent.clear(lastNameInput);
    userEvent.type(firstNameInput, userName[0]);
    userEvent.type(lastNameInput, userName[1]);
    addUser.click();
    userEvent.clear(firstNameInput);
    userEvent.clear(lastNameInput);
  }
  const sortedUsers = getUserNamesAsSortedTexts(userNames);

  // we should wait here for all the users to appear, before moving on
  await waitFor(() => expect(getAllTextsInOrderOfAppearanceContainingAnyOf(sortedUsers)).toEqual(sortedUsers.sort()));
};

const renderUsers = () => {
  return render(<MemoryRouter initialEntries={['/users']}>
    <UsersProvider>
      <Routes>
        <Route path={'/users/*'} element={<Users/>}/>
      </Routes>
    </UsersProvider>
  </MemoryRouter>);
};

test('initial number of users is 0', () => {
  renderUsers();

  expect(screen.getByText('0 users')).toBeInTheDocument();
});


test('adding users updates the number of users displayed', async () => {
  renderUsers();

  const addUser = screen.getByRole('button');
  addUser.click();
  addUser.click();
  addUser.click();
  addUser.click();

  await waitFor(() => expect(screen.getByText('4 users')).toBeInTheDocument());
});

test('adding users displays them sorted alphabetically', async () => {
  renderUsers();
  const userNames = [['John', 'Doe'], ['Anna Maria Magdalena', 'Unknown Doe'], ['Max', 'Mustermann']];
  const sortedUserNames = getUserNamesAsSortedTexts(userNames);

  await addUsers(userNames);

  await waitFor(() => expect(getAllTextsInOrderOfAppearanceContainingAnyOf(sortedUserNames)).toEqual(sortedUserNames));
});

test('remove user', async () => {
  renderUsers();

  const userNames = [['John', 'Doe'], ['Anna Maria Magdalena', 'Unknown Doe'], ['Max', 'Mustermann']];
  const sortedUserNames = getUserNamesAsSortedTexts(userNames);

  await addUsers(userNames);

  const [, removeSecondUser] = screen.getAllByRole('button', { name: 'Remove user' });
  removeSecondUser.click();

  await waitFor(() => expect(getAllTextsInOrderOfAppearanceContainingAnyOf(sortedUserNames)).toEqual([sortedUserNames[0], sortedUserNames[2]]));
});

test('display the users as links', async () => {
  renderUsers();
  const userNames = [['John', 'Doe'], ['Anna', 'Unknown'], ['Max', 'Mustermann']];
  const sortedUserNames = getUserNamesAsSortedTexts(userNames);

  await addUsers(userNames);

  const linksContainingUserNames = getAllInOrderOfAppearanceContainingAnyOf(sortedUserNames).map(element => element.closest('a'));
  expect(linksContainingUserNames).toHaveLength(3);
});

test('clicking on a user allows editing the user name and no user links are displayed', async () => {
  renderUsers();
  const userNames = [['Anna', 'Unknown'], ['John', 'Doe'], ['Max', 'Mustermann']];
  const sortedUserNames = userNames.map(user => `${user[0]} ${user[1]}`).sort();

  await addUsers(userNames);

  const [, secondUserLink] = (getAllInOrderOfAppearanceContainingAnyOf(sortedUserNames).map(element => element.closest('a')));
  secondUserLink!.click();

  // getByDisplayValue is used for inputs
  expect(screen.getByDisplayValue(userNames[1][0])).toBeInTheDocument();
  expect(screen.getByDisplayValue(userNames[1][1])).toBeInTheDocument();

  expect(queryAllInOrderOfAppearanceContainingAnyOf(sortedUserNames)).toHaveLength(0);

  expect(screen.getByText('3 users')).toBeInTheDocument();
});

test('update user name', async () => {
  renderUsers();
  const userNames = [['Anna', 'Unknown'], ['John', 'Unknown Doe'], ['Max', 'Mustermann']];
  const updatedUserNames = [...userNames];
  updatedUserNames[1][0] = 'Jane';
  updatedUserNames[1][1] = 'Doe';

  await addUsers(userNames);

  const userLinks = getAllInOrderOfAppearanceContainingAnyOf(getUserNamesAsSortedTexts(userNames)).map(element => element.closest('a'));
  expect(userLinks).toHaveLength(3);

  const secondUserLink = userLinks[1]!;
  secondUserLink.click();

  await waitFor(() => expect(screen.getByDisplayValue(userNames[1][0])).toBeInTheDocument());
  await waitFor(() => expect(screen.getByDisplayValue(userNames[1][1])).toBeInTheDocument());

  act(() => userEvent.clear(screen.getByLabelText('First name:')));
  act(() => userEvent.clear(screen.getByLabelText('Last name:')));

  await waitFor(() =>
    expect(screen.getByLabelText('Last name:')).toHaveDisplayValue(''), { timeout: 500 });
  await waitFor(() =>
    expect(screen.getByLabelText('First name:')).toHaveDisplayValue(''), { timeout: 500 });

  act(() => userEvent.type(screen.getByLabelText('First name:'), updatedUserNames[1][0]));
  act(() => userEvent.type(screen.getByLabelText('Last name:'), updatedUserNames[1][1]));
  await waitFor(() =>
    expect(screen.getByLabelText('First name:')).toHaveDisplayValue(updatedUserNames[1][0]));


  await waitFor(() =>
    expect(screen.getByLabelText('Last name:')).toHaveDisplayValue(updatedUserNames[1][1]));

  const saveButton = screen.getByRole('button', { name: 'Save' });
  userEvent.click(saveButton);

  expect(screen.getByText('3 users')).toBeInTheDocument();

  await waitFor(() => expect(getAllTextsInOrderOfAppearanceContainingAnyOf(getUserNamesAsSortedTexts([...userNames, updatedUserNames[1]])))
    .toEqual(getUserNamesAsSortedTexts(updatedUserNames)));
});