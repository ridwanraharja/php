<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Student True or False</title>
      <!-- Load external CSS libraries-->
      <link rel="stylesheet" href="//unpkg.com/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>
      <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
      <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
      <!-- App styles -->
      <link rel="stylesheet" href="../../../css/app.css"/>
      <link rel="stylesheet" href="../../../css/admin.css"/>
      <style>
         body{
            padding: 40px 10px;
         }

         .choose-answer .custom-radio .bi{
            margin: -10px 0;
            display: none;
            font-size: 26px
         }
         .choose-answer .custom-radio{
            padding: 10px 20px 10px 45px;
            border-radius: 10px;
            border: 2px solid #ddd;
         }
         .choose-answer .is-selected{
            box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);
            border-color: #007bff
         }
         .choose-answer .is-selected.is-correct{
            box-shadow: 0 0 0 0.2rem rgba(72,180,97,.5);
            border: 2px solid green
         }
         .choose-answer .is-selected.is-correct .custom-control-label::before{
            background-color: green!important
         }
         .choose-answer .is-selected.is-invalid{
            box-shadow: 0 0 0 0.2rem rgba(225,83,97,.5);
            border: 2px solid red
         }
         .choose-answer .is-selected.is-invalid .custom-control-label::before{
            background-color: red!important
         }
         .choose-answer .is-selected.is-correct input:checked~.custom-control-label .bi,
         .choose-answer .is-selected.is-invalid input:checked~.custom-control-label .bi{
            display: inline-block;
         }
		  
		  
		          .score-wrapper{
         padding: .75rem;
         position:relative;
         max-width: 200px;
         }
         .score-wrapper .star {
         color:#FDD835;
         font-size:2rem;
         left: calc(100px - 1rem);
         line-height:1;
         position:absolute;
         top:-12px;
         }
         .score{
         position:absolute;
         right: 0;
         margin-right:.5rem;
         line-height: 1;
         }
         .progress-wrapper {
         max-width:100px;
         position:relative;
         }
		  
		  ul.activity-contents {
			  padding-left: 0;
			  list-style: none;
		  }
		  .activity-contents li{
			  padding:.5rem 0;
			  border-bottom: 1px solid #cccc;
		  } 
      </style>
   </head>
   <body>
      <main id="app" class="main">
         <header class="header sticky-top"></header>
         <!--Nav Sidebar-->
         <nav class="sidebar hide-for-small-only bg-white" id="sidebarContainer"></nav>
         <!-- End Nav Sidebar--->
         <section class="content">
            <div class="container-fluid d-flex h-100">
               <div class="row w-100 m-0 p-0">
                  <div class="col-sm-12 col-lg-9 h-100 main-content">
                     <!-- true-false-question component -->
                     <true-false-question :questions="questions" @update-steps="handleUpdateSteps"></true-false-question>
                  </div>

                  <div class="col-sm-12 col-md-4 col-lg-3 side-content">
                     <!--Score Components-->
                      <score :scoreitems="scoreitems"></score>
                  </div>
               </div>
            </div>
         </section>
         <!--modals and alerts-->
         <!--end modals and alerts-->
      </main>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <!-- bootstrap vue -->
      <script src="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>

      <script type="module">
         import { TrueFalseQuestion } from './components/TrueFalseQuestion.js'
         import { Score } from "./components/Score.js"
         var app = new Vue ({
         	el: '#app',
            components: {
               TrueFalseQuestion,
               Score,
            },

            data() {
               return {
                  questions: [
                     {
                        question: 'The capital of France is Paris',
                        answer: true,
                        rightAnswer: 'The answer is True' 
                     },
                     {
                        question: 'The capital of Indonesia is Jakarta',
                        answer: true,
                        rightAnswer: 'The answer is True' 
                     },
                  ],
                  scoreitems: [
                     {
                        title: "Your Scores",
                        scoreLength: 0,
                        score: 0,
                     }
                  ]
               }
            },
            mounted() {
               this.scoreitems[0].scoreLength = this.questions.length;
            },
            methods: {
               handleUpdateSteps(newStep){
                  this.scoreitems[0].score = newStep;
               }
            }
         });
      </script>

   </body>
</html>
