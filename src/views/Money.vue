<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="输入备注信息"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';


@Component({
  components: {Tabs, Tags, FormItem, Types, NumberPad}
})
export default class Money extends Vue {
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

  onUpdateNotes(value: string): void {
    this.record.notes = value;
  }

  saveRecord(): void {
    this.$store.commit('createRecord', this.record);
  }

  // @Watch('recordList')
  // onRecordListChange(): void {
  //   recordListModel.save();
  // }
}

</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>

<style lang="scss" scoped>
</style>
