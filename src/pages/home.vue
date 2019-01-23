<template>
  <section>
    <nav>
      <ul>
        <li
          v-for="tab in tabs"
          :class="tab.currentType==true?'active':''"
        >{{tab.name}}</li>
      </ul>
    </nav>
    <div v-if="!getTopics.failure">
      <List :list="getTopics.all"></List>
    </div>
    <div v-else class="fail">获取文章失败</div>
  </section>
</template>
<script>
import List from "@/components/List";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    List: List
  },
  data() {
    return {
      type: "",
      page: "",
      fixed: false,
      show: true,
      configs: {
        visiable: false,
        text: "该操作需要登录账户。是否现在登录？",
        sure: "登录",
        cancel: true,
        callbackCancel: () => true,
        callback: () => {
          this.$router.go({ name: "login" });
        }
      }
    };
  },
  computed: {
    getTopics() {
      return this.$store.state.topicList;
    },
    tabs() {
        return this.$store.state.tabs
    }
  },
  mounted() {
    if (this.$route.path == "/") {
      this.type = "all";
      this.page = 1;
    } else {
      this.type = this.$route.query.type;
      this.page = this.$route.query.page;
    }
    this.initTopic();
    var obj = {
      type: this.type,
      page: this.page
    };
    this.getTopic(obj);
    window.addEventListener("scroll", this.scroll);
  },
  methods: {
    ...mapActions(["getTopic", "initTopic"]),
    scroll(e) {
      //滑动发布图标的变化
      this.otop = this.otop ? this.otop : 0;
      this.ltop = document.body.scrollTop;
      if (this.ltop > this.otop) {
        this.show = false;
      } else {
        this.show = true;
      }
      this.otop = this.ltop;

      //滑动加载
      if (
        document.body.scrollHeight -
          document.body.scrollTop -
          window.screen.height <=
        0
      ) {
        this.page++;
        this.getTopic(this.type, this.page);
      }
    },
  }
};
</script>
<style scoped>
section {
  background-color: #fff;
  margin: 0 3px;
}
section nav {
  background-color: #f6f6f6;
}
section nav ul {
  overflow: hidden;
}
section nav ul li {
  list-style: none;
  float: left;
  color: #80bd01;
  padding: 5px 6px;
  margin: 6px 2px;
}
section nav ul li.active {
  background-color: #80bd01;
  color: #fff;
}
.fail {
  color: #468847;
  background-color: #dff0d8;
  margin-top: -15px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
}
.publish {
  position: fixed;
  bottom: 0;
  right: 10px;
}
.publish img {
  width: 50px;
  height: 50px;
}
.enter-transition {
  transition: all 0.6s ease;
  height: 74px;
  overflow: hidden;
}
.enter-enter,
.enter-leave {
  height: 0;
}
</style>