<template>
  <layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="update"
                field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
import store from '@/store/index2';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag = store.findTag(this.$route.params.id);

  // tag?: { id: string, name: string } = undefined;

  created(): void {
    // this.tag = window.findTag(this.$router.params.id)
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  update(name: string): void {
    if (this.tag) {
      store.updateTag(this.tag.id, name);
    }
  }

  remove(): void {
    if (this.tag) {
      if (store.removeTag(this.tag.id)) {
        this.$router.back();
      }
    }
  }

  goBack(): void {
    this.$router.back();
  }

}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {

  }

  > .leftIcon {
    height: 24px;
    width: 24px;
  }

  > .rightIcon {
    height: 24px;
    width: 24px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}

</style>
