<!-- 支持用户编辑promots，将promots存入本地文件夹 -->
<script setup >
import { ref, reactive } from "vue"
import { savePromot, loadPromot } from '../../utils/settings';


// 存储用户输入的promots
const promot = reactive({
  pt_name: '',
  abbr: '',
  content: '',
})

const promots = reactive({
  value: []
});

const rows = ref(1)

const addPromot = () => {
  console.log(promot)
  // 存储到本地promots数组
  promots.value.push({
    pt_name: promot.pt_name,
    abbr: promot.abbr,
    content: promot.content,
  });
  savePromot(promots.value);
}

const columns = [{ key: 'pt_name', label: 'Promot name' },
{ key: 'abbr', label: 'Abbreviation' },
{ key: 'content', label: 'Content' }];





// 页面加载后，加载本地存储的promots
onMounted(() => {
  promots.value = loadPromot();
})

</script>
<template>
  <div class="flex flex-col flex-1 p-4">
    <!-- 表格 relatived是相对定位，ltr是文字方向从左到右, space-y-4是垂直间距 -->
    <div dir="ltr" class="relative  flex-1 space-y-4">
      <!-- 构建表格 -->
      <UTable :columns="columns" :rows="promots.value" />
    </div>
    <!-- 表单，mt-4是margin-top: 1rem -->
    <div class="mt-4">
      <UForm :state="promot" @submit="addPromot">
        <div class="flex flex-row w-full gap-2">
          <UTextarea class="flex-1 min-w-[50px]" autoresize :rows="rows" placeholder="Promot name"
            v-model="promot.pt_name" />
          <UTextarea class="flex-1" autoresize :rows="rows" placeholder="Abbreviation" v-model="promot.abbr" />
          <UTextarea class="flex-1 min-w-[300px]" autoresize :rows="rows" placeholder="Content"
            v-model="promot.content" />
          <UButton type="submit" class="h-fit">
            Add promot
          </UButton>
        </div>
      </UForm>
    </div>
    <!-- <UInput v-model="promot.name"  />
      <UInput v-model="promot.abbr" placeholder="Abbreviation" />
      <UInput v-model="promot.content" placeholder="Content" />
      <UButton @click="addPromot">Add promot</UButton> -->
  </div>
</template>
<style lang="scss" scoped></style>
