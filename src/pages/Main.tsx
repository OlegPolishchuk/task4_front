import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "hooks/useAppDispatch";
import {getMe, logoutUser} from "store/reducers/auth/thunks/thunks";
import {useAppSelector} from "hooks/useAppSelector";
import {
  selectAllUsersCheckedCheckbox, selectCurrentUserId,
  selectIsUserAuth, selectIsUsersChecked,
  selectUsers
} from "store/selectors";
import {
  blockUsers,
  deleteUsers,
  getUsers,
  unblockUsers
} from "store/reducers/users/thunks";
import {Form, Table} from "react-bootstrap";
import {AiOutlineDelete} from "react-icons/ai";
import {CgUnblock} from 'react-icons/cg'
import {BiBlock} from "react-icons/bi";
import {User} from "api/users/types";
import {
  setAllUsersCheckedCheckbox,
  setChecked,
  toggleAllUsersChecked
} from "store/reducers/users/usersReducer";
import {Title} from "components";
import {parseDate} from "utils/parseDate";

export const Main = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const allUsersCheckedCheckbox = useAppSelector(selectAllUsersCheckedCheckbox);
  const isUsersChecked = useAppSelector(selectIsUsersChecked);
  const currentUserId = useAppSelector(selectCurrentUserId);

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  const handleCheckboxChange = (user: User) => {
    const updatedUser = {...user, checked: !user.checked};
    dispatch(setChecked(updatedUser))
  }

  const handleChangeAllUsersChecked = () => {
    dispatch(setAllUsersCheckedCheckbox(!allUsersCheckedCheckbox))
    dispatch(toggleAllUsersChecked(!allUsersCheckedCheckbox))
  }

  const handleDeleteUsers = () => {
    if (!isUsersChecked) {
      return;
    }
    const usersId = users
      .filter(user => user.checked)
      .map(user => user._id);

    dispatch(deleteUsers(usersId))

  }

  const handleBlockUser = () => {
    if (!isUsersChecked) {
      return;
    }
    const checkedUsers = users.filter(user => user.checked)

    dispatch(blockUsers(checkedUsers))

    if (allUsersCheckedCheckbox) {
      dispatch(setAllUsersCheckedCheckbox(!allUsersCheckedCheckbox))
    }
  }

  const handleUnblockUsers = () => {
    if (!isUsersChecked) {
      return;
    }
    const checkedUsers = users.filter(user => user.checked)

    dispatch(unblockUsers(checkedUsers))

    if (allUsersCheckedCheckbox) {
      dispatch(setAllUsersCheckedCheckbox(!allUsersCheckedCheckbox))
    }
  }


  useEffect(() => {
    dispatch(getUsers());
  }, [])



  return (
    <div
      className={'d-flex flex-column justify-content-center align-items-center container'}>
      <Title title={'Main Page'} className={'mb-5'} />

      <div className={'w-100'}>

        <div className={'d-flex justify-content-end align-items-center gap-5 mb-3'}>
          <BiBlock
            className={`icon ${!isUsersChecked ? 'icon_disabled' : ''}`}
            title={'Block'}
            onClick={handleBlockUser}
          />
          <CgUnblock
            className={`icon ${!isUsersChecked ? 'icon_disabled' : ''}`}
            title={'Unblock'}
            onClick={handleUnblockUsers}
          />
          <AiOutlineDelete
            className={`icon ${!isUsersChecked ? 'icon_disabled' : ''}`}
            title={'Delete'}
            onClick={handleDeleteUsers}
          />
        </div>

        <Table striped bordered hover>

          <thead>
          <tr>
            <th>
              <Form.Check
                type={'checkbox'}
                checked={allUsersCheckedCheckbox}
                onChange={handleChangeAllUsersChecked}
              />
            </th>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created at</th>
            <th>Last Login</th>
            <th>Status</th>
          </tr>
          </thead>

          <tbody>
          {users.map(user => (
            <tr
              key={user._id}
              className={user._id === currentUserId ? 'table_row_active' : ''}
            >
              <td>
                <Form.Check
                  type={'checkbox'}
                  onChange={() => handleCheckboxChange(user)}
                  checked={user.checked}
                />
              </td>
              <td>{user._id}</td>
              <td>{user.login}</td>
              <td>{user.email}</td>
              <td>{parseDate(user.created)}</td>
              <td>{parseDate(user.lastLogin)}</td>
              <td>{user.status}</td>
            </tr>
          ))}
          </tbody>

        </Table>
      </div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};