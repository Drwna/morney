import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords(): RecordItem[] | undefined {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.recordList;
  },
  saveRecords(): void {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem): void {
    const record2 = clone(record);
    record2.createdAt = new Date().toISOString();
    // this.recordList && this.recordList.push(record2);
    this.recordList?.push(record2); // 可选链
    recordStore.saveRecords();
  },
};

recordStore.fetchRecords();

export default recordStore;
