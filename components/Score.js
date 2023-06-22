{
  /* <script setup>
let data = defineProps({
  title: String,
  scoreLength: Number,
  score: Number,
});
</script> */
}

const template = `

  <div class="score-item">
    <span>{{ scoreitems[0].title }}</span>
    <div
      class="score-wrapper border rounded-lg d-flex flex-column justify-content-between mb-2"
    >
      <div class="progress-wrapper">
        <b-progress
          :value="scoreitems[0].score"
          :max="scoreitems[0].scoreLength"
          variant="success"
        ></b-progress>
        <i
          ref="target"
          class="bi bi-star-fill star"
          :class="{
            'animate__animated animate__heartBeat':
              scoreitems[0].score == scoreitems[0].scoreLength,
          }"
        ></i>
      </div>
      <div class="score">
        <strong>{{ scoreitems[0].score }}/{{ scoreitems[0].scoreLength }}</strong>
      </div>
    </div>
  </div>
`;

export const Score = {
  inheritAttrs: false,
  template,
  name: "score",
  props: {
    scoreitems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      message: "Hello, Vue!",
      classes: null,
      isLoading: false,
      steps: 0,
      status: null,

      timer: null,
      countdown: 30,
      answer: null,
      showHint: false,
      isAnswered: false,
      isCorrect: false,
    };
  },
  mounted() {},
  methods: {},
};
