import React, { FormEvent } from 'react';
import {
  Container,
  Grid,
  IconList,
  IconListContainer,
  IconListItem,
  ProfileContainer,
  FormSearchBar,
  ContainerSearchBar,
  InputSearchBar,
  Wrapper,
} from './styles';

import { color } from './constants';
import { Text } from './components/Text';
import {
  INITIAL_STATE,
  navBarReducer,
  NavItemsType,
  NavBarActionType,
} from './reducer/navbarReducer';

import axios from 'axios';

type SearchBarProps = {
  onSubmit(text: string): void;
};
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

  function SearchBar(props: SearchBarProps) {
    const [searchText, setSearchText] = React.useState<string>('');

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!searchText) return;
      props.onSubmit(searchText);
    };

    return (
      <FormSearchBar onSubmit={handleSubmit}>
        <div>
          <InputSearchBar
            type="search"
            placeholder="digite o nome da pizza"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </FormSearchBar>
    );
  }

  function main() {
    const handleSubmitSearch = (text: string) => {
      console.log('valor do input', text);
    };
    return (
      <Container>
        <Wrapper>
          <ContainerSearchBar>
            <SearchBar onSubmit={handleSubmitSearch}></SearchBar>
          </ContainerSearchBar>
          <main>
            <h3>Escolha sua pizza</h3>
          </main>
        </Wrapper>
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
    </Grid>
  );
};
