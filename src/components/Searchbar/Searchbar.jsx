import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { toastConfig } from 'components/services/utils';
import { Header, SearchForm, SearchButton, SearchButtonLabel, SearchInput } from './Searchbar.styled';

export const Searchbar = ({ onSearchSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchQueryChange = event => {
    setSearchValue(event.currentTarget.value);
    };
   const handleSubmit = event => {
     event.preventDefault();
    if (searchValue.trim() === '') {
      toast.error('Enter a valid query', toastConfig);
      return;
    }
    onSearchSubmit(searchValue);
    setSearchValue('');
  };

    return (
     <Header >
        <SearchForm onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <FiSearch style={{ width: 22, height: 22 }} />
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={handleSearchQueryChange}
          />
        </SearchForm>
      </Header>
    );
}
Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};
   
  

