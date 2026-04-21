<script setup>
import Icon from "@/components/Icon.vue";
import { computed } from "vue";

const props = defineProps({
  outgoing: Boolean,
  content: String,
  timestamp: [String, Number],
  status: String
});

const parseToLocalDate = (timestamp) => {
  if (timestamp instanceof Date) return timestamp;

  if (typeof timestamp === "number") {
    return new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
  }

  return new Date(timestamp);
};

const formatFullTooltip = (date) => {
  return date.toLocaleString("da-DK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
};

const formatTime = (timestamp) => {
  const now = new Date();
  const date = parseToLocalDate(timestamp);

  const isToday = now.toDateString() === date.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = yesterday.toDateString() === date.toDateString();

  const time = date.toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit"
  });

  if (isToday) {
    return {
      label: time,
      tooltip: formatFullTooltip(date)
    };
  }

  if (isYesterday) {
    return {
      label: `I går kl. ${time}`,
      tooltip: formatFullTooltip(date)
    };
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return {
    label: `${day}-${month}-${year} ${time}`,
    tooltip: formatFullTooltip(date)
  };
};

const formatStatus = (status) => {
  const map = {
    sent: "Sendt",
    seen: "Set"
  };

  return map[status] ?? status;
};

const timeMeta = computed(() => formatTime(props.timestamp));
const statusLabel = computed(() => formatStatus(props.status));
</script>
<template>
  <div class="message" :class="{ 'message--outgoing': outgoing }">
    <p
      class="message__content"
      :class="
        outgoing ? 'message__content--outgoing' : 'message__content--incoming'
      "
    >
      {{ content }}
    </p>
    <time v-if="outgoing" class="message__meta" :title="timeMeta.tooltip">
      {{ timeMeta.label }}
    </time>

    <span v-else class="message__meta">
      {{ statusLabel }}
      <Icon name="Tjekmark" class="message__meta-icon" />
    </span>
  </div>
</template>
<style scoped lang="scss">
.message {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  &--outgoing {
    align-items: end;
  }

  &__content {
    padding: 0.375rem;
    max-width: 12.5rem;
    border-radius: $border-radius-small;
    font-size: 0.75rem;
    line-height: 1.25rem;
    word-break: break-all;

    &--incoming {
      background-color: $color-primary;
      color: $color-surface;
    }

    &--outgoing {
      background-color: $color-surface;
    }
  }

  &__meta {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: $color-primary;
    font-size: 0.625rem;
    line-height: 1.25rem;
  }

  &__meta-icon {
    display: inline-flex;
    flex-shrink: 0;
    width: 0.5rem;
    height: 0.5rem;
  }
}
</style>
