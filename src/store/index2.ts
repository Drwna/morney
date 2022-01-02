import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
  // record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem): void => recordListModel.create(record),

  // tag store
  tagList: tagListModel.fetch(),
  findTag(id: string): Tag {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag: (name: string): void => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名已存在，不能重复添加');
    } else if (message === 'success') {
      window.alert('添加成功');
    }
  },
  removeTag: (id: string): boolean => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string): string => {
    return tagListModel.update(id, name);
  },
};

export default store;
