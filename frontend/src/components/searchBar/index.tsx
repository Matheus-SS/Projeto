import React, { FormEvent } from 'react';
import { FormSearchBar, InputSearchBar } from './styles';

type SearchBarProps = {
  onSubmit(text: string): void;
};

export const SearchBar: React.FC<SearchBarProps> = (props) => {
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
          placeholder="Procure por pizzas aqui"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </FormSearchBar>
  );
};
