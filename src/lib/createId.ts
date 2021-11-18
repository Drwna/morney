let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

function createId(): number {
  id++;
  return id;
}

export default createId;