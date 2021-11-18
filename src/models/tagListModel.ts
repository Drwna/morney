import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';
type Tag = {
  id: string,
  name: string,
}
type TagListModel = {
  data: Tag[],
  fetch: () => Tag[],
  create: (name: string) => 'success' | 'duplicated', // 联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated',
  remove: (id: string) => boolean,
  save: () => void,
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name) {
    // this.data = [{id:'1', name:'1'},{id:'2', name:'2'}]
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) { return 'duplicated'; }
    const id = createId().toString();
    this.data.push({id, name: name});
    this.save();
    return 'success';
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.id);
      if (names.indexOf(name) >= 0) {
        window.alert('标签已存在');
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = tag.id = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    if (window.confirm('确认删除')) {
      this.data.splice(index, 1);
      this.save();
      return true;
    } else {
      return false;
    }
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;