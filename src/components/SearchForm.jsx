const { useState } = require('react');

const SearchForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e.target.elements.query.value);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
        }}
      />
      <button>Search</button>
    </form>
  );
};

export default SearchForm;
