<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import model from '@/model';


const recordList = model.fetch();


@Component({components: {Tags, Notes, Types, NumberPad}})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行', '女朋友', '男朋友'];
  recordList = recordList;
  // eslint-disable-next-line no-undef
  record: RecordItem[] = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]): void {
    this.record.tags = value;
  }

  onUpdateNotes(value: string): void {
    this.record.notes = value;
  }

  saveRecord(): void {
    const record2 = model.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange(): void {
    model.save(this.recordList);
  }
}

</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
</style>