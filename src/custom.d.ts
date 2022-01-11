type RecordItem = {
  tags: Tag[],
  notes: string,
  type: string,
  amount: number, // 数据类型
  createdAt?: string, // 类 / 构造函数
}

type RootState = {
  recordList: RecordItem[],
  createRecordError: Error | null,
  createTagError: Error | null,
  tagList: Tag[],
  currentTag?: Tag,
}

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Window {
  // store: {
  //   tagList: Tag[];
  //   findTag: (id: string) => Tag | undefined;
  //   createTag: (name: string) => void;
  //   removeTag: (id: string) => boolean;
  //   // updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  //   updateTag: TagListModel['update']; // 相同的简写
  //
  //   recordList: RecordItem[];
  //   createRecord: (record: RecordItem) => void;
  // };

}
