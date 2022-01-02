import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],
  fetchTags(): Tag[] {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  findTag(id: string): Tag {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag(name: string): string {
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名已存在，不能重复添加');
      return 'duplicated';
    }
    const id = createId().toString();
    this.tagList.push({id, name: name});
    this.saveTags();
    window.alert('添加成功');
    return 'success';
  },
  removeTag(id: string): boolean {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    if (window.confirm('确认删除')) {
      this.tagList.splice(index, 1);
      this.saveTags();
      return true;
    } else {
      return false;
    }
  },
  updateTag(id: string, name: string): string {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.id);
      if (names.indexOf(name) >= 0) {
        window.alert('标签已存在');
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = tag.id = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },

  saveTags(): void {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
};

tagStore.fetchTags();

export default tagStore;
