import Vue from 'vue';
import Component from 'vue-class-component';

const map: { [key: string]: string } = {
  'tag name duplicated': '标签名已存在，不能重复添加'
};

@Component
export class TagHelper extends Vue {
  createTag(): void {
    const name = window.prompt('请输入标签名');
    if (name === null) return;
    if (!name.trim()) return window.alert('标签名不能为空！');
    this.$store.commit('createTag', name);
    if (this.$store.state.createTagError) {
      window.alert(map[this.$store.state.createTagError.message] || '未知错误');
    }
  }
}

export default TagHelper;
