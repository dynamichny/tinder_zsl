<template>
  <div :class="['message', isSeries, messageClass, marginTop]">
    <div class="datestamp" v-if="dateStamp">
      <p><b>{{date.getDate()}}.{{date.getMonth() + 1}}.{{date.getFullYear()}}</b>, {{date.getHours()}}:{{date.getMinutes() &lt; 10 ? '0' + date.getMinutes() : date.getMinutes()}}</p>
      <!-- &lt; == <, its a wierd bug/edge case -->
    </div>
    <div :class="['box', boxClass]">{{data.content}}</div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    data: Object,
    prevous: Object,
    currentUserEmail: String,
    parent: Object
  },
  data() {
    return {
      dateStamp: false
    };
  },
  computed: {
    boxClass() {
      return this.data.author == this.currentUserEmail
        ? "current-user"
        : "target-user";
    },
    messageClass() {
      return this.data.author == this.currentUserEmail
        ? "current"
        : "targetUsr";
    },
    isSeries() {
      return this.prevous == undefined ||
        this.prevous.author == this.data.author
        ? "series"
        : "new";
    },
    date() {
      return new Date(this.data.when.seconds * 1000);
    },
    marginTop() {
      return this.dateStamp ? "biggerMargin" : "";
    }
  },
  mounted() {
    this.$emit('mount', Math.random())
    if (this.prevous == undefined) {
      this.dateStamp = true;
      return;
    }
    const messageDate = this.date;
    const prevousDate = new Date(this.prevous.when.seconds * 1000);
    const threeHours = 10800000;
    if (messageDate - prevousDate >= threeHours) {
      this.dateStamp = true;
    }
  }
};
</script>

<style scoped lang='scss'>
.message {
  display: flex;
  height: auto;
  position: relative;
}
.biggerMargin {
  margin-top: 50px !important;
}
.current {
  justify-content: flex-end;
}
.targetUsr {
  justify-content: flex-start;
}
.box {
  box-sizing: border-box;
  padding: 6px 12px 7px;
}
.current-user {
  background: rgb(0, 140, 255);
  color: white;
  margin: 1px 10px 1px 40px;
  border-radius: 16px 16px 4px 16px;
}
.target-user {
  background: rgb(219, 219, 219);
  color: black;
  margin: 1px 40px 1px 10px;
  border-radius: 16px 16px 16px 4px;
}

.series {
  .current-user {
    border-radius: 16px 4px 4px 16px;
    margin-top: 1px;
  }
  .target-user {
    border-radius: 4px 16px 16px 4px;
    margin-top: 1px;
  }
}
.new {
  margin-top: 20px;
}

.datestamp {
  position: absolute;
  left: 0;
  right: 0;
  top: -30px;
  margin: auto;
  p {
    margin: 0;
    text-align: center;
    font-size: 14px;
    color: rgb(99, 99, 99);
  }
}
</style>