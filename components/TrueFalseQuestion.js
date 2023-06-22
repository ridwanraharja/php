const template = `
<div ref="root">
  <b-overlay :show="isLoading">
      <div class="card" :class="classes">
         <div class="card-header">
            <h5>{{
               status == 'finish'
               ? 'Finished'
               : status == 'timeout'
               ? 'Timeout'
               : 'Read the Statements carefully'
            }}</h5>
         </div>
         <div class="card-body text-center">
            <div v-if="status == 'finish'" class="alert alert-success">
               <h5 class="text-center">Congratulations</h5>
               <p>You successfully completed all questions</p>
            </div>
            <div v-else-if="status == 'timeout'" class="alert alert-danger">
               <h5 class="text-center">Your time is up</h5>
               <p>Don't give up! Lets try again!</p>
            </div>
            <div v-else>
               <div class="timer mb-3">
                  <b-progress max="30" :variant="countdown <= 10 ? 'danger' : 'warning'" striped animated>
                     <b-progress-bar :value="countdown" :label="\`\${countdown} s\`" :class="{ 'text-dark': countdown > 10 }"></b-progress-bar>
                  </b-progress>
               </div>
               <p class="text-muted">{{ steps + 1}} of {{ questions.length }} questions</p>
               <p class="lead">{{ questions[steps].question }}</p>
               <b-form-group class="choose-answer" v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                     v-model="answer"
                     :disabled="isAnswered"
                     :aria-describedby="ariaDescribedby"
                  >
                     <b-form-radio :value="true" :class="{
                        'is-selected': answer == true,
                        'is-correct': isAnswered && isCorrect,
                        'is-invalid': isAnswered && !isCorrect,
                     }">
                        True
                        <i v-if="questions[steps].answer" class="bi bi-check text-success"></i>
                        <i v-else class="bi bi-x text-danger"></i>
                     </b-form-radio>
                     <b-form-radio :value="false" :class="{
                        'is-selected': answer == false,
                        'is-correct': isAnswered && isCorrect,
                        'is-invalid': isAnswered && !isCorrect,
                     }">
                        False
                        <i v-if="questions[steps].answer" class="bi bi-check text-success"></i>
                        <i v-else class="bi bi-x text-danger"></i>
                     </b-form-radio>
                  </b-form-radio-group>
               </b-form-group>
            </div>
         </div>
         <div class="card-footer">
            <div class="d-flex">
               <p class="mr-auto">{{ isAnswered && !isCorrect ? questions[steps].rightAnswer : '' }}</p>
               <button class="btn btn-primary" @click="next" v-if="isCorrect">Next</button>
               <button class="btn btn-primary" @click="tryagain" v-else-if="isAnswered || status == 'timeout'">Try again</button>
               <button class="btn btn-primary" @click="check(); updateParentSteps()" v-else-if="status != 'finish'">Check</button>
            </div>
         </div>
      </div>
   </b-overlay>
</div>`;

export const TrueFalseQuestion = {
  inheritAttrs: false,
  template,
  name: "true-false-question",
  props: {
    questions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      classes: null,
      isLoading: false,
      steps: 0,
      status: null,
      trueAnswer: 0,

      timer: null,
      countdown: 30,
      answer: null,
      showHint: false,
      isAnswered: false,
      isCorrect: false,
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    updateParentSteps() {
      this.$emit("update-steps", this.trueAnswer);
    },
    check() {
      if (this.answer != null) {
        this.isAnswered = true;
        this.stopTimer();
        if ((this.questions[this.steps].answer = this.answer)) {
          this.isCorrect = true;
          this.trueAnswer++;
        } else {
          this.showHint = true;
          this.isCorrect = false;
        }
      }
    },
    next() {
      this.resetTimer();
      if (this.steps < this.questions.length - 1) {
        this.steps += 1;
        this.startTimer();
      } else {
        this.status = "finish";
        this.stopTimer();
      }
    },
    tryagain() {
      this.steps = 0;
      this.status = null;
      this.resetTimer();
      this.startTimer();
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
        } else {
          this.status = "timeout";
          clearInterval(this.timer);
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    resetTimer() {
      this.countdown = 30;
      this.answer = null;
      this.isAnswered = false;
      this.isCorrect = false;
    },
  },
};
