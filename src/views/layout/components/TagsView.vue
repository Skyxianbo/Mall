<template>
    <scroll-pane class='tags-view-container' ref='scrollPane' v-if="show">
        <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
            {{tag.title}}
            <span class='el-icon-close' @click='closeViewTags(tag,$event)'></span>
        </router-link>
    </scroll-pane>
</template>

<script>
import ScrollPane from "@/components/ScrollPane";
// import { generateTitle } from '@/utils/i18n'

export default {
    components: { ScrollPane },
    computed: {
        visitedViews() {
            return this.$store.state.tagsView.visitedViews;
        },
        show: function() {
            return (this.$route.name != 'login' && this.$route.name != 'error' && this.$route.name != 'home');
        }
    },
    mounted() {
        this.addViewTags();
    },
    methods: {
        // generateTitle,
        closeViewTags(view, $event) {
            this.$store.dispatch("delVisitedViews", view).then(views => {
                if (this.isActive(view)) {
                    const latestView = views.slice(-1)[0];
                    if (latestView) {
                        this.$router.push(latestView.path);
                    } else {
                        this.$router.push({ name: 'goods' });
                    }
                }
            });
            $event.preventDefault();
        },
        generateRoute() {
            if (this.$route.name) {
                return this.$route;
            }
            return false;
        },
        addViewTags() {
            const route = this.generateRoute();
            if (!route) {
                return false;
            }
            this.$store.dispatch("addVisitedViews", route);
        },
        isActive(route) {
            return route.path === this.$route.path;
        },
        moveToCurrentTag() {
            const tags = this.$refs.tag || [];
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag.$el);
                        break;
                    }
                }
            });
        }
    },
    watch: {
        $route() {
            this.addViewTags();
            this.moveToCurrentTag();
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
    position: fixed !important;
    top: 125px;
    z-index: 99;
    background: #fff;
    height: 34px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tags-view-item {
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &:first-of-type {
            margin-left: 15px;
        }
        &.active {
            background-color: rgb(50, 163, 214);
            color: #fff;
            border-color: rgb(50, 163, 214);
            &::before {
                content: "";
                background: #fff;
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                position: relative;
                margin-right: 2px;
            }
        }
    }
}

.scroll-wrapper {
    left: 0 !important;
}
</style>

<style rel="stylesheet/scss" lang="scss">
.tags-view-container {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: 2px;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;
            &:before {
                transform: scale(0.6);
                display: inline-block;
                vertical-align: -3px;
            }
            &:hover {
                background-color: #b4bccc;
                color: #fff;
            }
        }
    }
}
</style>
