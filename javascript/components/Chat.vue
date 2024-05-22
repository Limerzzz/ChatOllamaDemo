<script setup>

import { Ollama } from 'ollama';
import { loadOllamaHost } from '../utils/settings';

const ollamaHost = ref(null);
const ollama = ref(null);

const model = ref(null);
const messages = ref([]);// 创建一个空数组，用于存储聊天记录
const sending = ref(false);
const state = reactive({
  instruction: "",
  input: ""
})
// 监听model变化，清空聊天记录
watch(model, async (newModel) => {
  messages.value = [];
})

const onSend = async () => {
  // 如果正在发送消息，或者输入框内容为空，或者没有选择聊天对象，或者没有ollama实例，则直接返回
  if (sending.value || !state.input?.trim() || !model.value || !ollama.value) {
    return;
  }

  console.log("Sending message: ", state.input);
  sending.value = true;

  // 获得消息的输入框内容
  const { input } = state; // 注意这是一个reactive对象，所以可以直接赋值,修改会被传递
  // 重置输入框
  rows.value = 1;

  setTimeout(() => { // 模拟延迟
    state.input = "";
  }, 50);
  messages.value.push({ // 向聊天记录中添加一条消息
    role: "user",
    content: input
  });

  // 发送消息给机器人,  等待机器人回复
  const response = await ollama.value.chat({
    model: model.value,
    // ...messages.value, // 这里可以传入聊天记录，让机器人可以基于历史消息进行回复
    messages: [...messages.value],
    // 希望以流式的方式接收机器人回复，而不是一次性返回所有回复
    stream: true
  });

  for await (const chunk of response) {
    const content = chunk?.message?.content;
    if (messages.value.length > 0 && messages.value[messages.value.length - 1].role === 'assistant') {
      // 如果上一条消息是机器人回复，则将其内容追加到上一条消息中
      messages.value[messages.value.length - 1].content += content;
    } else {
      messages.value.push({ role: 'assistant', content });
    }
  }

  sending.value = false;
}

const onModelSelected = (modelName) => {
  model.value = modelName;
}

const rows = ref(1);

watch(ollamaHost, async (newHost) => {
  if (newHost) {
    console.log("Switching Ollama host: ", newHost);
    ollama.value = new Ollama({ host: newHost });
  }
});

// 页面加载完成后，加载ollamaHost，Vue
onMounted(() => {
  ollamaHost.value = loadOllamaHost();
});


</script>


<template>
  <div class="flex flex-col flex-1 p-4">
    <div class="flex flex-row items-center justify-between mb-4 pb-4 border-b border-b-gray-200">
      <!-- 显示当前聊天对象 -->
      <div class="flex flex-row" v-if="model">
        <span>Chat with</span>
        <h1 class="font-bold pl-1">{{ model }}</h1>
      </div>
      <ModelsDropdown @modelSelected="onModelSelected" />
    </div>
    <!-- 聊天记录，dir属性用于设置文本方向，ltr表示从左到右，rtl表示从右到左 -->
    <div dir="ltr" class="relative overflow-y-scroll flex-1 space-y-4">
      <ul className="flex flex-1 flex-col">
        <!-- 遍历消息数组，渲染消息，key属性用于设置唯一标识 -->
        <li v-for="(message, index) in messages" :key="index">
          <div
            :class="`${message.role == 'assistant' ? 'bg-white' : 'bg-primary-50'} border border-slate-150 rounded my-4 px-3 py-2`">
            <h3 class="font-bold">{{ message.role }}</h3>
            <p class="mt-2">{{ message.content }}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 输入框,mt-4是margin-top: 1rem -->
    <div class="mt-4">
      <UForm :state="state" @submit="onSend" @keydown.shift.enter="onSend">
        <div class="flex flex-row w-full gap-2">
          <!-- 输入框，autoresize属性用于自动调整输入框的高度,rows属性用于设置输入框的行数 -->
          <UTextarea class="flex-1" autoresize :rows="rows" v-model="state.input" />
          <UButton type="submit" :disabled="!model" :loading="sending" class="h-fit">
            Send
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
