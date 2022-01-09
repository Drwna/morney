<template>
  <layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <div>
      type:{{ type }}
      <br/>
      interval: {{ interval }}
    </div>
    <div>

      <ol>
        <li v-for="(group, index) in result" :key="index">
          <h3>{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id">
              {{ item.amount }}
              {{ item.createdAt }}
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {

  get recordList(): RecordItem[] {
    return (this.$store.state as RootState).recordList;
  }

  get result(): { [key: string]: { title: string, items: RecordItem[] } } {
    const {recordList} = this;
    type HashTabItem = { title: string, items: RecordItem[] }

    const hashTable: { [key: string]: HashTabItem } = {};

    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T');

      hashTable[date] = hashTable[date] || {title: date, items: []};

      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  beforeCreate(): void {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }
}

::v-deep .interval-tabs-item {
  height: 48px;
}
</style>
