export type MenuItemsType = {
  id: number;
  text: string;
  active: boolean;
};

export enum MenuActionType {
  HANDLE_CLICK_NAVBAR_ITEM = 'HANDLE_CLICK_NAVBAR_ITEM',
}

type Action = {
  type: MenuActionType;
  payload: number;
};

export const INITIAL_STATE_MENU = [
  {
    id: 1,
    text: 'All chats',
    active: true,
  },
  {
    id: 2,
    text: 'Groups',
    active: false,
  },
  {
    id: 3,
    text: 'Contacts',
    active: false,
  },
];

export const menuMessageReducer = (state: MenuItemsType[], action: Action) => {
  switch (action.type) {
    case MenuActionType.HANDLE_CLICK_NAVBAR_ITEM:
      return state.map((menuItem: MenuItemsType) => {
        if (menuItem.id === action.payload) {
          return { ...menuItem, active: true };
        }
        return { ...menuItem, active: false };
      });
    default:
      return state;
  }
};
