import React from 'react';
import {
  Container,
  ContainerMessage,
  Grid,
  IconList,
  IconListContainer,
  IconListItem,
  MenuMessage,
  ProfileContainer,
} from './styles';

import { color, size } from './constants';
import { Text } from './components/Text';
import {
  INITIAL_STATE,
  navBarReducer,
  NavItemsType,
  NavBarActionType,
} from './navbarReducer';

import axios from 'axios';
type RequestType = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    medium: string;
  };
};
type ConversationType = {
  name: string;
  image: string;
};
type MenuItemsType = {
  id: number;
  text: string;
  active: boolean;
};

const INITIAL_STATE_MENU = [
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

export const App: React.FC = () => {
  function sidebar() {
    const [state, dispatch] = React.useReducer(navBarReducer, INITIAL_STATE);

    const handleClickItemNavBar = (id: number) => {
      dispatch({
        type: NavBarActionType.HANDLE_CLICK_NAVBAR_ITEM,
        payload: id,
      });
    };
    return (
      <Container>
        <IconListContainer>
          <IconList>
            {state.map((navI: NavItemsType) => (
              <IconListItem key={navI.id}>
                <a
                  href={navI.path}
                  onClick={() => handleClickItemNavBar(navI.id)}
                >
                  {navI.icon(navI.active)}
                  <Text
                    color={
                      navI.active ? color.fonts.active : color.fonts.secondary
                    }
                  >
                    {navI.text}
                  </Text>
                </a>
              </IconListItem>
            ))}
          </IconList>
        </IconListContainer>

        <ProfileContainer>
          <img src="https://i.pravatar.cc/150?img=27" />
        </ProfileContainer>
      </Container>
    );
  }

  function main() {
    const [menuMessage, setMenuMessage] =
      React.useState<MenuItemsType[]>(INITIAL_STATE_MENU);
    const [conversation, setConversation] = React.useState<ConversationType[]>(
      []
    );

    const [loading, setLoading] = React.useState<Boolean>(false);

    const handleClickMenuMessageItem = (id: number) => {
      const newMenu = menuMessage.map((menuItem: MenuItemsType) => {
        if (menuItem.id === id) {
          return { ...menuItem, active: true };
        }
        return { ...menuItem, active: false };
      });

      setMenuMessage(newMenu);
    };

    React.useEffect(() => {
      async function fetchData() {
        setLoading(true);
        const { data } = await axios.get(
          'https://randomuser.me/api/?results=5&nat=BR'
        );

        const mappedConversation = data.results.map((result: RequestType) => ({
          name: `${result.name.first} ${result.name.last}`,
          image: result.picture.medium,
        }));

        setConversation(mappedConversation);
        setLoading(false);
      }
      fetchData();
    }, []);

    return (
      <Container>
        <ContainerMessage>
          <Text size={size.font.large} weight="bold">
            Messages
          </Text>
          <MenuMessage>
            <ul>
              {menuMessage.map((message: MenuItemsType) => (
                <li
                  onClick={() => handleClickMenuMessageItem(message.id)}
                  className={message.active ? 'active' : ''}
                  key={message.id}
                >
                  <Text
                    size={size.font.small}
                    color={
                      message.active
                        ? color.fonts.active
                        : color.fonts.secondary
                    }
                    weight={message.active ? 'bold' : 'regular'}
                  >
                    {message.text}
                  </Text>
                </li>
              ))}
              <div className="indicator" />
            </ul>
          </MenuMessage>

          <ul>
            <li>
              {/* <ProfileContainer>
                <img src="https://i.pravatar.cc/150?img=27" />
              </ProfileContainer>
              <Text></Text> */}
            </li>
          </ul>
        </ContainerMessage>
      </Container>
    );
  }

  function chat() {
    return <h1>Chat</h1>;
  }
  return (
    <Grid>
      {sidebar()}
      {main()}
      {chat()}
    </Grid>
  );
};
