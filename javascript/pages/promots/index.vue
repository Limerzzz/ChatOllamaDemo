<!-- 支持用户编辑promots，将promots存入本地文件夹 -->
<script setup lang="ts">
import { ref, reactive } from "vue"
import { savePromot, loadPromot } from '../../utils/settings';


interface Promot {
  name: string;
  abbr: string;
  content: string;
}

// 存储用户输入的promots
const promot = reactive({
  name: '',
  abbr: '',
  content: '',
})
const promots = ref([])

// 加载本地promots
promots.value = loadPromot();


const rows = ref(1)

const addPromot = () => {
  console.log(promot)
  savePromot(promot)
  // promots = loadPromot();
}



</script>
<template>
  <div class="flex flex-col flex-1 p-4">
    <div dir="ltr" class="relative  flex-1 space-y-4">
      <UTable :row="promot" class="flex-auto" />
    </div>
    <div class="mt-4">
      <UForm :state="promot" @submit="addPromot">
        <div class="flex flex-row w-full gap-2">
          <UTextarea class="flex-1 min-w-[50px]" autoresize :rows="rows" placeholder="Promot name"
            v-model="promot.name" />
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
