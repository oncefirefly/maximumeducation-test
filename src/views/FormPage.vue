<template>
  <div class="container">
    <div clas="title">
      <h1 class="title" id="control-4889178">
        Форма подачи заявки в отдел сервиса и качества
      </h1>
    </div>
    <form id="form">
      <div class="form">
        <div class="form__select-city select-city">
          <label for="select-city" class="select-city__label">
            Ваш филиал
            <span class="required">*</span>
          </label>
          <select
            v-model="selectedCity"
            class="select-city__options"
            :disabled="isOnline"
          >
            <option class="options__placeholder" disabled value="">
              Выберите город
            </option>
            <option
              class="select-city__option"
              v-for="city in citiesList"
              :value="city.title"
              :key="city.title"
              ref="cities"
            >
              {{ city.title }}
            </option>
          </select>
          <div class="select-city__online">
            <input
              @change="switchOnlineCheckBox"
              class="online"
              value="online"
              type="checkbox"
              ref="onlineCheckBox"
            />
            <label for="online">Онлайн</label>
          </div>
        </div>
        <div class="form__request-theme request-theme">
          <label for="request-theme" class="request-theme__label">
            Тема обращения
            <span class="required">*</span>
          </label>
          <div class="request-theme__options">
            <div v-for="theme in requestThemesList" :key="theme.id">
              <input
                v-model="pickedTheme"
                @click="resetCustomRequestTheme"
                name="requestTheme"
                :id="theme.id"
                :value="theme.value"
                type="radio"
                ref="themes"
              />
              <label :for="theme.id"> {{ theme.name }} </label>
            </div>
          </div>
          <div class="request-theme__other">
            <input
              v-model="customRequestTheme"
              @input="resetThemesBtns"
              type="text"
              placeholder="Другое"
            />
          </div>
        </div>
        <div class="form__problem-desc problem-desc">
          <label for="problem-desc">
            Описание проблемы
            <span class="required">*</span>
          </label>
          <textarea v-model="problemDesc" class="problem-desc__text"></textarea>
        </div>
        <div class="form__upload-file upload-file">
          <label for="upload-file"> Загрузка документов </label>
          <p class="upload-file__desc">
            Приложите, пожалуйста, полноэкранный скриншот. <br />
            Это поможет быстрее решить проблему.
          </p>
          <input type="file" ref="fileToUpload" />
        </div>
        <div class="form__submit submit">
          <button
            @click.prevent="submitForm"
            type="submit"
            class="submit__btn submit-btn"
            :disabled="!allRequirementsMet"
          >
            Отправить
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { getCitiesList, sendForm } from "../modules/api";

export default {
  name: "FormPage",

  data() {
    return {
      citiesList: [],

      requestThemesList: [
        {
          id: 1,
          name: "Недоволен качеством услуг",
          value: "unsatisfied",
        },
        {
          id: 2,
          name: "Расторжение договора",
          value: "termination of agreement",
        },
        {
          id: 3,
          name: "Не приходит письмо активации на почту",
          value: "no email",
        },
        {
          id: 4,
          name: "Не работает личный кабинет",
          value: "personal area doesn't work",
        },
      ],

      customRequestTheme: "",
      problemDesc: "",
      selectedCity: "",
      pickedTheme: "",

      isOnline: false,
      allRequirementsMet: false,
      submitSuccess: false,
    };
  },

  beforeCreate: async function () {
    this.citiesList = await getCitiesList();
  },

  beforeUpdate: function () {
    if (
      (this.selectedCity.length || this.isOnline === true) &&
      (this.pickedTheme.length || this.customRequestTheme.length) &&
      this.problemDesc.length
    ) {
      this.allRequirementsMet = true;
    } else {
      this.allRequirementsMet = false;
    }
  },

  methods: {
    async submitForm() {
      const submitionResponse = await sendForm();

      console.log(submitionResponse);

      if (!submitionResponse.success) {
        alert("Ошибка отправки заявки");
      } else {
        window.location.pathname = "/success";
        this.resetForm();
      }
    },

    resetForm() {
      this.$refs.onlineCheckBox.checked = false;
      this.$refs.themes.forEach((theme) => (theme.checked = false));
      this.$refs.fileToUpload.value = "";
    },

    switchOnlineCheckBox() {
      if (this.isOnline === true) {
        this.isOnline = false;
      } else {
        this.isOnline = true;
      }
    },

    resetThemesBtns() {
      if (this.customRequestTheme.length) {
        this.$refs.themes.forEach((theme) => (theme.checked = false));
      }
    },

    resetCustomRequestTheme() {
      this.customRequestTheme = "";
    },
  },
};
</script>
