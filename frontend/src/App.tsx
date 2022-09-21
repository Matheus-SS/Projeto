import React from 'react';
import {
  Container,
  Grid,
  IconList,
  IconListContainer,
  IconListItem,
  ProfileContainer,
} from './styles';

import { color } from './constants';
import { Text } from './components/Text';
import {
  INITIAL_STATE,
  navBarReducer,
  NavItemsType,
  NavBarActionType,
} from './navbarReducer';

export const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(navBarReducer, INITIAL_STATE);

  const handleClickItemNavBar = (id: number) => {
    dispatch({ type: NavBarActionType.HANDLE_CLICK_NAVBAR_ITEM, payload: id });
  };

  function sidebar() {
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
    return <h1>Main</h1>;
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
