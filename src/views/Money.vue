<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="输入备注信息"
                :value.sync="record.notes"/>
    </div>
    <Tags @update:value="record.tags = $event"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Inject} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

type callbackFunction = () => void

@Component({
  components: {Tabs, Tags, FormItem, NumberPad}
})
export default class Money extends Vue {
  @Inject('reload') readonly reload!: callbackFunction;

  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  recordTypeList = recordTypeList;

  get recordList(): void {
    return this.$store.state.recordList;
  }

  created(): void {
    this.$store.commit('fetchRecords');
  }

  // onUpdateNotes(value: string): void {
  //   this.record.notes = value;
  // }

  saveRecord(): void {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
      // this.record.notes = '';
      this.reload();
    }
  }

  // @Watch('recordList')
  // onRecordListChange(): void {
  //   recordListModel.save();
  // }
}

</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>

<style lang="scss" scoped>
</style>
