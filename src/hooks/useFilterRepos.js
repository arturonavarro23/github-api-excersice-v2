import { useState } from 'react';

export default function useFilterRepos(userRepos) {
  const [query, setQuery] = useState('');

  const onQueryChange = e => {
    setQuery(e.target.value);
  };

  const repos = !query ? userRepos : userRepos.filter(r => r.name.includes(query));
  return [repos, query, onQueryChange]
}
