export function parsePath(path) {
  let pathname = path || '/';
  let search = '';
  let hash = '';

  const hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  const searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}

export function createPath(location) {
  const { pathname, search, hash } = location;

  let path = pathname || '/';

  if (search && search !== '?')
    path += search.charAt(0) === '?' ? search : `?${search}`;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : `#${hash}`;

  return path;
}
