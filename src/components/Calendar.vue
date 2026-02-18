<template>
  <div class="calendar-container">
    <FullCalendar v-if="isReady" :options="calendarOptions" />

    <div
      v-if="popover.visible"
      class="event-popover"
      :style="{
        top: `${popover.y}px`,
        left: `${popover.x}px`,
        width: `${popover.width}px`,
        maxHeight: `${popover.maxHeight}px`,
        overflowY: 'auto',
      }"
      @click.stop
    >
      <div class="popover-header">
        <strong>{{ popover.title }}</strong>
      </div>
      <div class="popover-time">
        {{ popover.time }}
      </div>
      <div v-if="popover.description" class="popover-body" v-html="popover.description"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import iCalendarPlugin from '@fullcalendar/icalendar';
import listPlugin from '@fullcalendar/list';
import { getUiTranslations } from '../i18n/ui/ui-i18n-helper';

const props = defineProps({
  locale: {
    type: String,
    default: 'en',
  },
});

const t = getUiTranslations(props.locale);

// --- Popover State & Logic ---

const POPOVER_WIDTH = 250;
const MIN_POPOVER_HEIGHT = 280;
const MIN_POPOVER_MARGIN = 5;
const SMALL_SCREEN_WIDTH = 500;

const isSmallScreen = ref(false);
const isReady = ref(false);

const popover = ref({
  visible: false,
  width: POPOVER_WIDTH,
  x: 0,
  y: 0,
  maxHeight: 0,
  title: '',
  time: '',
  description: '',
});

const closePopover = () => {
  popover.value.visible = false;
};

// Global click listener to close popover when clicking anywhere else
const handleGlobalClick = () => {
  if (popover.value.visible) {
    closePopover();
  }
};

onMounted(() => {
  window.addEventListener('click', handleGlobalClick);
  isSmallScreen.value = window.innerWidth <= SMALL_SCREEN_WIDTH;
  isReady.value = true;
});

onUnmounted(() => {
  window.removeEventListener('click', handleGlobalClick);
});

const formatEventTime = (event) => {
  if (!event.start) return '';

  const options = { hour: '2-digit', minute: '2-digit', hour12: false };
  const start = event.start.toLocaleTimeString([], options);

  if (event.end) {
    const end = event.end.toLocaleTimeString([], options);
    return `${start} - ${end}`;
  }

  return start;
};

const cleanAndLinkify = (text) => {
  if (!text) return '';

  // Strip HTML tags using the browser's DOM parser
  const doc = new DOMParser().parseFromString(text, 'text/html');
  const plainText = doc.body.textContent || '';

  // Find URLs and turn them into clickable links
  // This regex finds URLs starting with http/https
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return plainText.replace(urlRegex, (url) => {
    // Basic cleanup in case the URL ends with a punctuation mark from the text
    const cleanUrl = url.replace(/[.,!?;:]+$/, '');
    return `<span class="event-link-wrapper"><a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="event-link">${cleanUrl}</a></span>`;
  });
};
// --- End of Popover State & Logic ---

// --- Calendar Configuration ---
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, iCalendarPlugin, listPlugin],
  initialView: isSmallScreen.value ? 'listMonth' : 'dayGridMonth',
  firstDay: 1,
  showNonCurrentDates: false,
  fixedWeekCount: false,
  contentHeight: 'auto',
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  // Hover tooltip to see the full title
  eventDidMount: (info) => {
    if (info.event.title) {
      info.el.setAttribute('title', info.event.title);
    }
  },
  // Click Handler for Popover with event details
  eventClick: (info) => {
    const { event, jsEvent } = info;

    jsEvent.preventDefault();
    jsEvent.stopPropagation();

    const popoverX = Math.min(jsEvent.clientX, window.innerWidth - POPOVER_WIDTH - MIN_POPOVER_MARGIN);

    const popoverY = Math.max(
      MIN_POPOVER_MARGIN,
      Math.min(jsEvent.clientY, window.innerHeight - MIN_POPOVER_HEIGHT - MIN_POPOVER_MARGIN),
    );
    const maxPopoverHeight = window.innerHeight - popoverY - MIN_POPOVER_MARGIN;

    popover.value = {
      visible: true,
      width: POPOVER_WIDTH,
      x: popoverX,
      y: popoverY,
      maxHeight: maxPopoverHeight,
      title: event.title,
      time: formatEventTime(event),
      description: cleanAndLinkify(event.extendedProps.description || ''),
    };
  },
  eventSources: [
    {
      url: '/api/get-calendar?source=pretix',
      format: 'ics',
      color: '#3788d8',
      label: t.calendar.workshops,
    },
    {
      url: '/api/get-calendar?source=events',
      format: 'ics',
      color: '#f89538',
      label: t.calendar.openEvents,
    },
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,listMonth',
  },
}));
</script>
// --- End of Calendar Configuration --- // --- Styles for Popover ---
<style scoped>
.calendar-container *,
.calendar-container *::before,
.calendar-container *::after {
  box-sizing: border-box;
}

.calendar-container {
  position: relative;
  /* Ensure z-index context */
  z-index: 1;
}

.calendar-container :deep(.fc) {
  --fc-neutral-bg-color: var(--card);
  --fc-border-color: var(--border);
  --fc-page-bg-color: var(--bg);
  --fc-list-event-hover-bg-color: var(--card);
}

.event-popover {
  position: fixed; /* Fixed allows it to float over everything regardless of calendar scroll */
  z-index: 1000;
  background-color: var(--bg);
  color: var(--fg);
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px;
  font-family: sans-serif;
  font-size: 0.9rem;
  pointer-events: auto;
}

.popover-header {
  margin-bottom: 4px;
  color: var(--fg);
}

.popover-time {
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 8px;
}

.popover-body {
  font-size: 0.85rem;
  color: var(--fg);
  white-space: pre-wrap; /* Preserves line breaks from description */
  border-top: 1px solid #eee;
  padding-top: 8px;
}

.popover-body :deep(.event-link-wrapper) {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

@media (max-width: 500px) {
  .calendar-container :deep(.fc-header-toolbar) {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  .calendar-container :deep(.fc-toolbar-chunk) {
    display: flex;
    justify-content: center;
  }

  .calendar-container :deep(.fc-button) {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
}
</style>
