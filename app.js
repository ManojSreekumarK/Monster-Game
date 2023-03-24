const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      counter: 0,
      isButtonDisabled: false,
      remainingTime: 0,
      logitems: [],
      mn: 0,
      hn: 0,
    };
  },
  watch: {
    monsterHealth: function () {
      console.log(this.monsterHealth);
    },
  },
  computed: {
    Mhurt() {
      return {
        width: `${this.monsterHealth}%`,
      };
    },
    Hhurt() {
      return {
        width: `${this.playerHealth}%`,
      };
    },
    isSecondButtonClickable() {
      return this.counter >= 3;
    },
  },
  methods: {
    handleclick() {
      this.attackMonster();
      this.incrementCounter();
    },
    attackMonster() {
      this.mn = Math.floor(Math.random() * 15);
      this.hn = Math.floor(Math.random() * 20);
      this.monsterHealth -= this.mn;
      this.playerHealth -= this.hn;
      this.logitems.push(`Monster attacked player health - ${this.hn}`);
      this.logitems.push(`Player attacked monster health - ${this.mn}`);
    },
    incrementCounter() {
      this.counter++;
    },
    secondButtonClicked() {
      if (this.isSecondButtonClickable) {
        this.mn = Math.floor(Math.random() * 11) + 15;
        this.monsterHealth -= this.mn;
        this.logitems.push(
          `Player used special attack monster health - ${this.mn}`
        );
        this.counter = 0;
      }
    },
    reloadGame() {
      // Reset the game state and reload the page
      location.reload();
    },
    handleButtonClick() {
      this.hn = Math.floor(Math.random() * 6) + 5;
     if (this.playerHealth <= 90) {
        this.playerHealth += this.hn;
      } else {
        alert("High health");
      }
      this.logitems.push(`Player used heal player health + ${this.hn}`);
      this.isButtonDisabled = true;
      this.remainingTime = 8;
      const updateTimerId = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime === 0) {
          clearInterval(updateTimerId);

          // Re-enable the button after the countdown
          this.isButtonDisabled = false;
        }
      }, 1000);
    },
    surrender() {
      this.playerHealth = 0;
    },
  },
});
app.mount("#game");
