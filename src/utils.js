export const setPath = (object, path, value) => {
  const parts = path.split('.');
  if (parts.length === 1) {
    object[path] = value;
  } else {
    if (!object[parts[0]]) object[parts[0]] = {};
    setPath(object[parts[0]], parts.slice(1).join('.'), value);
  }
};
